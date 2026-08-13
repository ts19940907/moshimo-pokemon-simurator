# Database (Supabase)

App tables live in the **`moshimo`** schema (not `public`), to keep them separate from other apps on the same project.

## Files

- Migration (create): `supabase/migrations/20260813000000_create_pokemon.sql`
- Migration (move from public): `supabase/migrations/20260813000100_move_pokemon_to_moshimo_schema.sql`
- Migration (unique by generation): `supabase/migrations/20260813120000_pokemon_unique_by_generation.sql`
- Migration (gender): `supabase/migrations/20260813133000_add_pokemon_gender.sql`
- Migration (moves): `supabase/migrations/20260813140000_create_moves.sql`
- Ability seed: `supabase/seed/abilities.sql`
- Gen1 pokemon seed: `supabase/seed/gen1_pokemon.sql`
- Combined pokemon reseed: `supabase/seed/gen1_all.sql`（abilities → pokemon の順）
- Gen1 moves + junction: `supabase/seed/gen1_moves_all.sql`（moves → pokemon_moves の順）

## Client

`src/lib/supabase.ts` uses:

```ts
createClient(url, key, { db: { schema: "moshimo" } })
```

Remote API must expose `moshimo` (Dashboard → Settings → API → Exposed schemas, or PostgREST `db_schema`).

## Bitmask (`generation_introduced`)

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
where generation_introduced & (1 << (N - 1)) <> 0;
```

同一種族は **値が世代で変わらない限り1レコード**（例: `511` = Gen1..9）。種族値・タイプ・特性が変わるときだけレコードを分け、bitmask を分割する（ユニークキーに `generation_introduced` を含む）。

第6世代で値が変わる初代勢は `31`（Gen1–5）と `480`（Gen6–9）に分割。Gen6–9 側の `base_special` は NULL。

- 物理種族値バフ: 13体（スピアー、ピジョット、アーボック など）
- フェアリータイプ化: 5体（ピッピ、ピクシー、プリン、プクリン、バリヤード）

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
