# Database (Supabase)

App tables live in the **`moshimo`** schema (not `public`), to keep them separate from other apps on the same project.

## Files

- Migration (create): `supabase/migrations/20260813000000_create_pokemon.sql`
- Migration (move from public): `supabase/migrations/20260813000100_move_pokemon_to_moshimo_schema.sql`
- Migration (unique by generation): `supabase/migrations/20260813120000_pokemon_unique_by_generation.sql`
- Migration (gender): `supabase/migrations/20260813133000_add_pokemon_gender.sql`
- Migration (moves): `supabase/migrations/20260813140000_create_moves.sql`
- Migration (final evolution): `supabase/migrations/20260813150000_add_pokemon_final_evolution.sql`
- Migration (generation columns): `supabase/migrations/20260813160000_pokemon_moves_generation_columns.sql`
- Migration (pokemon_moves generations): `supabase/migrations/20260813170000_pokemon_moves_available_generations.sql`
- Migration (drop junction generation): `supabase/migrations/20260813180000_drop_pokemon_moves_available_generations.sql`
- Migration (move effects): `supabase/migrations/20260814110000_moves_effect_columns.sql`
- Migration (tools / held items): `supabase/migrations/20260825000100_create_tools.sql`
- Ability seed: `supabase/seed/abilities.sql`
- Gen1 pokemon seed: `supabase/seed/gen1_pokemon.sql`
- Combined pokemon reseed: `supabase/seed/gen1_all.sql`（abilities → pokemon の順）
- Gen1 moves + junction: `supabase/seed/gen1_moves_all.sql`（moves → pokemon_moves の順。**TRUNCATE あり**・空DB向け）
- Gen1 moves UPSERT（既存DB向け）: `supabase/seed/gen1_moves_upsert.sql`（初代技仕様の修正を反映。TRUNCATE なし）
- Gen2 Johto pokemon (additive): `supabase/seed/gen2_all.sql`（abilities upsert → Johto pokemon）
- Gen2 moves (additive UPSERT): `supabase/seed/gen2_moves.sql`
- Gen2 tools / held items (additive): `supabase/seed/gen2_tools.sql`（`node scripts/generate-gen2-tools-seed.mjs` で再生成）
- Gen1→Gen2 Kanto splits (additive): `supabase/seed/gen2_kanto_splits.sql`（`node scripts/generate-gen2-kanto-splits-seed.mjs` で再生成。差分がある種族のみ行分割）
- 既存DBへの技適用順（コメントガイド）: `supabase/seed/apply_moves_gen1_and_gen2.sql`
- Gen2 learnsets（SQL Editor 向け分割）:
  1. `gen2_pokemon_moves_00_setup.sql`
  2. `gen2_pokemon_moves_01_values.sql` … `08_values.sql`（番号順）
  3. `gen2_pokemon_moves_99_finalize.sql`
- Gen2 moves + learnsets 一括（`psql` 用）: `supabase/seed/gen2_moves_all.sql`

### 既存DBで Gen2 の技を出す手順

1. `gen1_moves_upsert.sql` — 初代技マスタの修正を UPSERT（`gen1_moves.sql` は使わない）
2. `gen2_moves.sql` — 第2世代登場技を UPSERT
3. learnset: `gen2_pokemon_moves_00_setup.sql` → `01`…`08_values.sql` → `99_finalize.sql`

技マスタだけでは不足で、**`pokemon_moves` の紐づけ**まで入れるとダメージ計算／パーティ設定で技が表示される。

## Client

`src/lib/supabase.ts` uses:

```ts
createClient(url, key, { db: { schema: "moshimo" } })
```

Remote API must expose `moshimo` (Dashboard → Settings → API → Exposed schemas, or PostgREST `db_schema`).

## Generation columns

- `introduced_generation`: 初登場世代（ヒスイは 9）
- `available_generations`: その環境の対戦で使える世代のビットマスク

| Generation | Bit value |
|------------|-----------|
| 1 | 1 |
| 2 | 2 |
| 3 | 4 |
| 4 | 8 |
| 5 | 16 |
| 6 | 32 |
| 7 | 64 |
| 8 | 128 |
| 9 | 256 |

```sql
select * from moshimo.pokemon
where available_generations & (1 << (N - 1)) <> 0;
```

同一種族は **値が世代で変わらない限り1レコード**（例: `511` = Gen1..9）。種族値・タイプ・特性が変わるときだけレコードを分け、bitmask を分割する（ユニークキーに `available_generations` を含む）。

`pokemon_moves` は **解決済みの pokemon 行 ID × move 行 ID** の紐づけのみ（世代カラムなし）。世代はポケモン／技マスタ側で行を選んでから JOIN する。

第2世代で値が変わる初代勢は Gen1 専用行（`1`）と Gen2 以降行に分割（`gen2_kanto_splits.sql` / `gen1_pokemon.sql`）。

- 鋼タイプ化: コイル、レアコイル（でんき → でんき／はがね）
- 最終進化フラグ解除: ゴルバット（クロバット）、イワーク（ハガネール）、ストライク（ハッサム）

第6世代で値が変わる初代勢は `31`（Gen1–5）と Gen6 以降行に分割。Gen8/9 で対戦不可の種は該当ビットを落とす（例: スピアーの Gen6 行は `96` = Gen6–7）。

- 物理種族値バフ: 13体（スピアー、ピジョット、アーボック など）
- フェアリータイプ化: 5体（ピッピ、ピクシー、プリン、プクリン、バリヤード）

初代技マスタは Gen2 でも威力学・タイプが同じものは共用（`511` 等）。Gen1≠Gen2 の数値差分は現状なし。

- `base_special`: 第1世代の「特殊」（Gen2+ 専用レコードでは NULL）
- `base_sp_attack` / `base_sp_defense`: 第2世代以降の特攻・特防
- `ability*_id`: 特性マスタ（`moshimo.abilities`）への FK。UUID は PokeAPI ability id から決定的に生成

## Type ids (`moshimo.types`)

| id | 日本語 | English |
|---:|--------|---------|
| 0 | なし | None（`type2` の単タイプ用） |
| 1 | ノーマル | Normal |
| 2 | ほのお | Fire |
| 3 | みず | Water |
| 4 | でんき | Electric |
| 5 | くさ | Grass |
| 6 | こおり | Ice |
| 7 | かくとう | Fighting |
| 8 | どく | Poison |
| 9 | じめん | Ground |
| 10 | ひこう | Flying |
| 11 | エスパー | Psychic |
| 12 | むし | Bug |
| 13 | いわ | Rock |
| 14 | ゴースト | Ghost |
| 15 | ドラゴン | Dragon |
| 16 | あく | Dark |
| 17 | はがね | Steel |
| 18 | フェアリー | Fairy |

`pokemon.type1` は 1..18、`pokemon.type2` は 0（単タイプ）または 1..18。

### gender

| 値 | 意味 |
|---:|------|
| 0 | 性別なし |
| 1 | オスメスあり |
| 2 | オスのみ |
| 3 | メスのみ |

`pokemon.id` / `abilities.id` は UUID。
