/**
 * Build Gen1 move master + pokemon_moves seed SQL from PokeAPI.
 *
 * - introduced_generation=1; available_generations competitive mask (Gen8/9 cleared when removed)
 * - damage_class: status from API meta, else Gen1 type-based physical/special
 * - effect_category / effect_meta / effect_code (PokeAPI meta + Gen1 overrides)
 * - description: Japanese (flavor preferred, else generated from effect)
 * - junction: Gen1-usable pokemon rows (bit 0 set) × RB/Yellow learnset
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN1_VERSION_GROUPS = new Set(["red-blue", "yellow"]);

/** Moves removed from Gen8+ competitive environments (clear bits 128|256 = 384). */
const REMOVED_GEN8_PLUS = new Set([
  3, 4, 13, 26, 27, 32, 35, 66, 67, 99, 112, 117, 119, 121, 125, 128, 131, 132,
  140, 145, 146, 148, 149,
]);

const TYPE_NAME_TO_ID = {
  normal: 1,
  fire: 2,
  water: 3,
  electric: 4,
  grass: 5,
  ice: 6,
  fighting: 7,
  poison: 8,
  ground: 9,
  flying: 10,
  psychic: 11,
  bug: 12,
  rock: 13,
  ghost: 14,
  dragon: 15,
  dark: 16,
  steel: 17,
  fairy: 18,
};

const GEN1_PHYSICAL_TYPES = new Set([1, 7, 10, 8, 9, 13, 12, 14, 17]);

const STAT_JA = {
  attack: "こうげき",
  defense: "ぼうぎょ",
  "special-attack": "とくこう",
  "special-defense": "とくぼう",
  special: "とくしゅ",
  speed: "すばやさ",
  accuracy: "めいちゅう",
  evasion: "かいひ",
};

const AILMENT_JA = {
  paralysis: "まひ",
  sleep: "ねむり",
  freeze: "こおり",
  burn: "やけど",
  poison: "どく",
  confusion: "こんらん",
  trap: "バインド",
  disable: "かなしばり",
};

/** Gen1 secondary-effect / power corrections vs modern PokeAPI meta. */
const GEN1_META_OVERRIDES = {
  /** Tri Attack: no secondary in Gen1 */
  161: { clearAilment: true, category: "damage" },
  /** Dizzy Punch: no confusion in Gen1 */
  146: { clearAilment: true, category: "damage" },
  /** Bite: 10% flinch */
  44: { flinch_chance: 10 },
  /** Waterfall: no flinch in Gen1 */
  127: { flinch_chance: 0 },
  /** Rock Slide: no flinch in Gen1 */
  157: { flinch_chance: 0 },
  /** Sky Attack: no flinch in Gen1 */
  143: { flinch_chance: 0 },
  /** Low Kick: fixed 50 BP + 30% flinch */
  67: { power: 50, flinch_chance: 30 },
  /** Double-Edge: 1/4 recoil */
  38: { drain: -25 },
  /** Growth: +1 Special only */
  74: {
    stat_changes: [{ stat: "special", change: 1 }],
  },
  /** Acid: -1 Defense */
  51: {
    stat_changes: [{ stat: "defense", change: -1 }],
  },
  /** Psychic: -1 Special */
  94: {
    stat_changes: [{ stat: "special", change: -1 }],
  },
  /** Partial traps: 2–5 turns */
  20: { min_turns: 2, max_turns: 5 },
  35: { min_turns: 2, max_turns: 5 },
  83: { min_turns: 2, max_turns: 5 },
  128: { min_turns: 2, max_turns: 5 },
};

/** effect_code for unique / Gen1-special handlers. */
const EFFECT_CODE_BY_ID = {
  50: "unique-disable",
  100: "unique-teleport",
  102: "unique-mimic",
  116: "unique-focus-energy",
  118: "unique-metronome",
  119: "unique-mirror-move",
  144: "unique-transform",
  150: "unique-splash",
  156: "unique-rest",
  160: "unique-conversion",
  164: "unique-substitute",
  63: "unique-hyper-beam",
  20: "unique-partial-trap",
  35: "unique-partial-trap",
  83: "unique-partial-trap",
  128: "unique-partial-trap",
  19: "unique-charge",
  91: "unique-charge",
  130: "unique-charge",
  76: "unique-charge",
  143: "unique-charge",
  13: "unique-charge",
  37: "unique-lock",
  80: "unique-lock",
  99: "unique-lock",
  117: "unique-bide",
  26: "unique-crash",
  136: "unique-crash",
  49: "unique-fixed-damage",
  82: "unique-fixed-damage",
  101: "unique-fixed-damage",
  69: "unique-fixed-damage",
  149: "unique-fixed-damage",
  162: "unique-fixed-damage",
  68: "unique-fixed-damage",
  120: "unique-explosion",
  153: "unique-explosion",
  12: "unique-ohko",
  32: "unique-ohko",
  90: "unique-ohko",
};

function moveUuid(pokeapiId) {
  return `00000000-0000-4000-8001-${String(pokeapiId).padStart(12, "0")}`;
}

function sqlStr(s) {
  if (s === null || s === undefined) return "NULL";
  if (typeof s === "boolean") return s ? "TRUE" : "FALSE";
  if (typeof s === "number") return String(s);
  if (typeof s === "object") {
    return `'${JSON.stringify(s).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(s).replace(/'/g, "''")}'`;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "moshimo-pokemon-simulator/1.0" },
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

function gen1DamageClass(typeId, apiDamageClass) {
  if (apiDamageClass === "status") return "status";
  return GEN1_PHYSICAL_TYPES.has(typeId) ? "physical" : "special";
}

function availableGenerationsFor(pokeapiId) {
  const all = 511;
  return REMOVED_GEN8_PLUS.has(pokeapiId) ? all & ~384 : all;
}

function buildEffectMeta(apiMeta, statChanges) {
  const ailment = apiMeta?.ailment?.name ?? "none";
  return {
    ailment: ailment === "none" ? null : ailment,
    ailment_chance: apiMeta?.ailment_chance ?? 0,
    drain: apiMeta?.drain ?? 0,
    healing: apiMeta?.healing ?? 0,
    flinch_chance: apiMeta?.flinch_chance ?? 0,
    crit_rate: apiMeta?.crit_rate ?? 0,
    min_hits: apiMeta?.min_hits ?? null,
    max_hits: apiMeta?.max_hits ?? null,
    min_turns: apiMeta?.min_turns ?? null,
    max_turns: apiMeta?.max_turns ?? null,
    stat_chance: apiMeta?.stat_chance ?? 0,
    stat_changes: (statChanges ?? []).map((s) => ({
      stat: s.stat.name,
      change: s.change,
    })),
  };
}

function applyGen1Overrides(pokeapiId, category, meta, power) {
  const override = GEN1_META_OVERRIDES[pokeapiId];
  let nextCategory = category;
  let nextMeta = { ...meta, stat_changes: [...(meta.stat_changes ?? [])] };
  let nextPower = power;

  if (!override) {
    return { category: nextCategory, meta: nextMeta, power: nextPower };
  }

  if (override.clearAilment) {
    nextMeta.ailment = null;
    nextMeta.ailment_chance = 0;
    nextMeta.min_turns = null;
    nextMeta.max_turns = null;
  }
  if (override.category) nextCategory = override.category;
  if (override.flinch_chance != null) nextMeta.flinch_chance = override.flinch_chance;
  if (override.drain != null) nextMeta.drain = override.drain;
  if (override.min_turns != null) nextMeta.min_turns = override.min_turns;
  if (override.max_turns != null) nextMeta.max_turns = override.max_turns;
  if (override.stat_changes) nextMeta.stat_changes = override.stat_changes;
  if (override.power != null) nextPower = override.power;

  return { category: nextCategory, meta: nextMeta, power: nextPower };
}

function pickJapaneseDescription(m) {
  const flavorPreferred = [
    "red-blue",
    "yellow",
    "firered-leafgreen",
    "heartgold-soulsilver",
    "black-white",
  ];
  for (const vg of flavorPreferred) {
    const hit = m.flavor_text_entries.find(
      (f) => f.language.name === "ja-Hrkt" && f.version_group?.name === vg,
    );
    if (hit?.flavor_text) {
      return String(hit.flavor_text).replace(/\s+/g, " ").trim();
    }
  }
  const anyJa = m.flavor_text_entries.find((f) => f.language.name === "ja-Hrkt");
  if (anyJa?.flavor_text) {
    return String(anyJa.flavor_text).replace(/\s+/g, " ").trim();
  }
  const jaEffect = m.effect_entries.find((e) => e.language.name === "ja");
  if (jaEffect?.short_effect || jaEffect?.effect) {
    return String(jaEffect.short_effect || jaEffect.effect)
      .replace(/\s+/g, " ")
      .trim();
  }
  return null;
}

function generateDescriptionJa({
  category,
  meta,
  effectCode,
  power,
  damageClass,
}) {
  const parts = [];
  if (effectCode === "unique-splash") return "何も起こらない。";
  if (effectCode === "unique-teleport") return "戦闘から脱出する。トレーナー戦では失敗する。";
  if (effectCode === "unique-transform") return "相手と同じポケモンにへんしんする。";
  if (effectCode === "unique-metronome") return "ランダムな技をくりだす。";
  if (effectCode === "unique-mirror-move") return "相手が最後に使った技をまねる。";
  if (effectCode === "unique-mimic") return "相手の技をコピーして自分のものにする。";
  if (effectCode === "unique-conversion") return "自分のタイプを技のタイプに変える。";
  if (effectCode === "unique-substitute")
    return "HPを少し削ってみがわりを出し、攻撃を引き受ける。";
  if (effectCode === "unique-rest") return "HPを全回復し、2ターンのねむり状態になる。";
  if (effectCode === "unique-focus-energy")
    return "気合をためる。初代カセットでは急所率が下がる。";
  if (effectCode === "unique-disable") return "相手の技のひとつを使えなくする。";
  if (effectCode === "unique-hyper-beam")
    return "強いダメージを与える。命中し相手を倒し切れないと次のターン動けない。";
  if (effectCode === "unique-partial-trap")
    return "相手を2〜5ターン行動不能にし、毎ターンダメージを与える。";
  if (effectCode === "unique-charge") return "1ターンためてから攻撃する。";
  if (effectCode === "unique-lock")
    return "2〜3ターン連続で攻撃し、その後こんらんする。";
  if (effectCode === "unique-bide")
    return "2〜3ターン耐え、受けたダメージの2倍を返す。";
  if (effectCode === "unique-crash")
    return "攻撃技。外すと自分も少しダメージを受ける。";
  if (effectCode === "unique-explosion")
    return "自分のHPを0にして大ダメージを与える。";
  if (effectCode === "unique-ohko") return "相手のHPを0にする一撃必殺技。";
  if (effectCode === "unique-fixed-damage") return "固定ダメージを与える。";

  if (category === "damage" || category?.startsWith("damage")) {
    parts.push(power != null ? `威力${power}の攻撃。` : "ダメージを与える。");
  } else if (category === "heal") {
    parts.push(`HPを${meta.healing ?? 50}%回復する。`);
  } else if (category === "ailment" && meta.ailment) {
    parts.push(`相手を${AILMENT_JA[meta.ailment] ?? meta.ailment}状態にする。`);
  } else if (category === "net-good-stats") {
    parts.push("能力を変化させる。");
  } else if (damageClass === "status") {
    parts.push("変化技。");
  }

  if (meta.ailment && meta.ailment_chance > 0) {
    parts.push(
      `${meta.ailment_chance}%の確率で${AILMENT_JA[meta.ailment] ?? meta.ailment}にする。`,
    );
  }
  if (meta.flinch_chance > 0) {
    parts.push(`${meta.flinch_chance}%の確率でひるませる。`);
  }
  if (meta.drain > 0) {
    parts.push(`与えたダメージの${meta.drain}%を回復する。`);
  }
  if (meta.drain < 0) {
    parts.push(`与えたダメージの${Math.abs(meta.drain)}%を反動で受ける。`);
  }
  if (meta.min_hits && meta.max_hits) {
    parts.push(
      meta.min_hits === meta.max_hits
        ? `${meta.min_hits}回連続で攻撃する。`
        : `${meta.min_hits}〜${meta.max_hits}回連続で攻撃する。`,
    );
  }
  if (meta.stat_changes?.length) {
    for (const sc of meta.stat_changes) {
      const name = STAT_JA[sc.stat] ?? sc.stat;
      const dir = sc.change > 0 ? "上がる" : "下がる";
      parts.push(`${name}が${Math.abs(sc.change)}段階${dir}。`);
    }
  }
  if (meta.crit_rate > 0) parts.push("急所に当たりやすい。");

  return parts.join("") || "技の効果。";
}

async function main() {
  console.log("fetch generation 1 moves…");
  const generation = await fetchJson("https://pokeapi.co/api/v2/generation/1/");
  const moveRefs = generation.moves;
  const moves = [];

  for (let i = 0; i < moveRefs.length; i += 1) {
    const ref = moveRefs[i];
    process.stdout.write(`\rmove ${i + 1}/${moveRefs.length} ${ref.name}          `);
    const m = await fetchJson(ref.url);
    const pokeapiId = m.id;
    const typeName = m.type.name;
    const typeId = TYPE_NAME_TO_ID[typeName];
    if (!typeId) throw new Error(`unknown type ${typeName} for move ${m.name}`);

    const nameJa =
      m.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
      m.names.find((n) => n.language.name === "ja")?.name ||
      m.name;
    const nameEn =
      m.names.find((n) => n.language.name === "en")?.name || m.name;

    const apiClass = m.damage_class?.name ?? "status";
    let damageClass = gen1DamageClass(typeId, apiClass);
    let resolvedTypeId = typeId;
    if (resolvedTypeId === 16 || resolvedTypeId === 17 || resolvedTypeId === 18) {
      resolvedTypeId = 1;
      if (damageClass !== "status") damageClass = "physical";
    }

    let category = m.meta?.category?.name ?? "unique";
    let meta = buildEffectMeta(m.meta, m.stat_changes);
    let power = m.power;
    ({ category, meta, power } = applyGen1Overrides(
      pokeapiId,
      category,
      meta,
      power,
    ));

    const effectCode = EFFECT_CODE_BY_ID[pokeapiId] ?? null;

    const description =
      pickJapaneseDescription(m) ||
      generateDescriptionJa({
        category,
        meta,
        effectCode,
        power,
        damageClass,
      });

    moves.push({
      id: moveUuid(pokeapiId),
      pokeapi_id: pokeapiId,
      name_ja: nameJa,
      name_en: nameEn,
      type_id: resolvedTypeId,
      damage_class: damageClass,
      power,
      accuracy: m.accuracy,
      pp: m.pp,
      priority: m.priority ?? 0,
      description,
      effect_category: category,
      effect_meta: meta,
      effect_code: effectCode,
      introduced_generation: 1,
      available_generations: availableGenerationsFor(pokeapiId),
    });
  }
  console.log(`\nmoves ${moves.length}`);

  console.log("fetch pokemon learnsets (RB/Yellow)…");
  const learnsets = new Map();
  for (let dex = 1; dex <= 151; dex += 1) {
    process.stdout.write(`\rpokemon ${dex}/151`);
    const p = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const ids = new Set();
    for (const entry of p.moves) {
      const ok = entry.version_group_details.some((d) =>
        GEN1_VERSION_GROUPS.has(d.version_group.name),
      );
      if (!ok) continue;
      const moveId = Number(entry.move.url.match(/\/move\/(\d+)\//)[1]);
      ids.add(moveId);
    }
    learnsets.set(dex, ids);
  }
  console.log("\nlearnsets done");

  const moveByPokeapi = new Map(moves.map((row) => [row.pokeapi_id, row]));

  const columns = [
    "id",
    "pokeapi_id",
    "name_ja",
    "name_en",
    "type_id",
    "damage_class",
    "power",
    "accuracy",
    "pp",
    "priority",
    "description",
    "effect_category",
    "effect_meta",
    "effect_code",
    "introduced_generation",
    "available_generations",
  ];

  const movesSql = [
    "-- Gen1 move master (introduced_generation=1)",
    "truncate table moshimo.pokemon_moves cascade;",
    "truncate table moshimo.moves cascade;",
    "",
    `insert into moshimo.moves (${columns.join(", ")}) values`,
    `${moves
      .map(
        (row) =>
          `(${columns
            .map((col) => {
              if (col === "effect_meta") return sqlStr(row.effect_meta);
              return sqlStr(row[col]);
            })
            .join(", ")})`,
      )
      .join(",\n")};`,
    "",
  ].join("\n");

  const junctionLines = [];
  for (const [dex, moveIds] of learnsets) {
    for (const moveId of moveIds) {
      if (!moveByPokeapi.has(moveId)) continue;
      junctionLines.push(
        `select p.id, ${sqlStr(moveUuid(moveId))}::uuid from moshimo.pokemon p where p.dex_no = ${dex} and (p.available_generations & 1) <> 0`,
      );
    }
  }

  const junctionSql = [
    "-- Link Gen1-usable pokemon rows to Gen1 moves (RB/Yellow learnsets)",
    "insert into moshimo.pokemon_moves (pokemon_id, move_id)",
    `${junctionLines.join("\nunion all\n")};`,
    "",
  ].join("\n");

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "gen1_moves.sql"), `${movesSql}\n`);
  fs.writeFileSync(
    path.join(seedDir, "gen1_pokemon_moves.sql"),
    `${junctionSql}\n`,
  );
  fs.writeFileSync(
    path.join(seedDir, "gen1_moves_all.sql"),
    `${movesSql}\n${junctionSql}\n`,
  );

  fs.writeFileSync(
    path.join(root, "src/data/gen1-moves.json"),
    `${JSON.stringify(moves, null, 2)}\n`,
  );
  const learnsetObj = Object.fromEntries(
    [...learnsets.entries()].map(([dex, set]) => [
      dex,
      [...set].sort((a, b) => a - b),
    ]),
  );
  fs.writeFileSync(
    path.join(root, "src/data/gen1-learnsets.json"),
    `${JSON.stringify(learnsetObj, null, 2)}\n`,
  );

  console.log(`junction select-arms ${junctionLines.length}`);
  console.log(
    "wrote supabase/seed/gen1_moves.sql, gen1_pokemon_moves.sql, gen1_moves_all.sql",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
