---
name: dev-rules
description: 開発作業のルールに従って実装・修正を進めるスキル。「dev-rules」「ブランチチェック」と依頼された際、コードの実装・修正を行う際、および「[世代]-third-generation」「[世代]-second-generation」「[世代]-first-generation」ブランチのプッシュを指示された際に使用する。
---

# Dev Rules

開発作業はこのスキルのルールに従う。ルールを飛ばして実行しない。

## ブランチチェック

「ブランチチェック」と入力されたら、今いるブランチに当てはまる、このファイルのチェックを行い、できていないものは対応する。

1. 現在ブランチを確認し、名前から当てはまるチェックを選ぶ
   - `[世代]-third-generation` → 「[世代]-third-generation ブランチのDBチェック」
   - `[世代]-second-generation` → 「[世代]-second-generation ブランチの特性・性格・あられチェック」
   - `[世代]-first-generation` → 「[世代]-first-generation ブランチの1世代ルールチェック」
   - どれにも当てはまらないときは、当てはまるチェックがないことを伝えて終える
2. 選んだチェックの「確かめる内容」をすべて確かめ、項目ごとに「できている／できていない」を報告する
3. できていない項目は、その場で対応する
   - シードがない → 既存のシード（前の世代の同じ種類のシードなど）にならって作成する
   - 除外リストに足りない技・道具がある、または絞り込みが外れている → `src/pokemon/rulesExclusions.ts`・各リポジトリを直す
   - アプリ側の対応が足りない → 必要なコードを直し、テストと型チェックを流す
   - DBに入っていない → `.env` のキーでは書き込めないため、Supabase の SQL Editor で実行するシードとその順番を伝える（シードがなければ先に作成する）
4. 対応後にもう一度チェックし、結果を報告する。DBへの反映がユーザー待ちのものは、そのことを明記する
- ファイル変更は git-rules に従う（`dev3`・`dev4`・`release` 上なら変更を始めず、作業用ブランチを作るか確認する）
- 「ブランチチェック」ではコミット・プッシュはしない。必要なら別途指示を受ける

## [世代]-third-generation ブランチのDBチェック

`[世代]-third-generation`（例: `feature/fourth-third-generation`）のプッシュを指示されたら（git-rules の `cm` の `p` も含む）、プッシュ前に、その世代で追加した技の「物理・特殊を技タイプで決めたレコード」（3世代以前のルール用）がDBに入っているかを確かめる。

- 世代は英語の序数で読む: `fourth` → 4、`fifth` → 5、`sixth` → 6 …（以下、世代を N とする）
- 確かめる内容
  1. シード `supabase/seed/genN_moves_pre_genN_type_class.sql` がリポジトリにあること
  2. DB（`moshimo.moves`）に、`introduced_generation = N` かつ `available_generations` が N 世代のビット（`2^(N-1)`）より小さい行（＝3世代以前のルール専用の行）が1件以上あること
- DBは `.env` の `EXPO_PUBLIC_SUPABASE_URL`・`EXPO_PUBLIC_SUPABASE_ANON_KEY` を使って REST で件数を数える（N=4 の例）

  ```bash
  set -a; source .env; set +a
  curl -s -I "$EXPO_PUBLIC_SUPABASE_URL/rest/v1/moves?select=id&introduced_generation=eq.4&available_generations=lt.8" \
    -H "apikey: $EXPO_PUBLIC_SUPABASE_ANON_KEY" -H "Accept-Profile: moshimo" -H "Prefer: count=exact" | rg -i content-range
  ```

  `content-range` の `/` の後ろが件数（`*/0` なら0件）
- 両方そろっていればそのままプッシュする
- シードがないとき、またはDBの件数が0件のときはプッシュせず、足りないもの（作成が必要なシード、または Supabase で実行が必要なシードとその順番）を伝え、対応してから進めるか、このままプッシュするかを確認する

## [世代]-second-generation ブランチの特性・性格・あられチェック

`[世代]-second-generation`（例: `feature/fourth-second-generation`）のプッシュを指示されたら（git-rules の `cm` の `p` も含む）、プッシュ前に、その世代で追加した技・道具のうち **特性または性格にしか働かないもの**、および **天候のあられにしか作用しない技** が、特性・性格・あられのない2世代以前のルールで表示されないようになっているかを確かめる。

- 世代は英語の序数で読む: `fourth` → 4、`fifth` → 5、`sixth` → 6 …（以下、世代を N とする）
- 確かめる内容
  1. その世代で追加した技（`src/data/genN-moves.json`）と道具（`src/data/genN-tools.json`）の中から、次のものを洗い出す
     - 特性または性格にしか働かない技・道具
       - 技の例: いえき・なやみのタネ（特性を消す・変える）、なりきり・スキルスワップ（特性をコピー・交換する）
       - 道具の例: フィラ・ウイ・マゴ・バンジ・イアのみ（性格で混乱するかが決まる）
     - 天候のあられにしか作用しない技
       - 技の例: あられ（あられを降らせるだけ）
       - あられで命中・威力などが変わるだけで、あられがなくても攻撃として使える技（ふぶきなど）は対象外
  2. 洗い出したものが `src/pokemon/rulesExclusions.ts` の除外リストに入っていること
     - 技 → `GEN3_MECHANIC_MOVE_POKEAPI`（`isMoveUsableInRules` が2世代以前で `false` を返す）
     - 道具 → `GEN3_MECHANIC_TOOL_POKEAPI`（`isToolUsableInRules` が2世代以前で `false` を返す）
  3. 技・道具の一覧を取る処理（`src/pokemon/moveRepository.ts`・`src/pokemon/toolRepository.ts`）が、今も `isMoveUsableInRules`・`isToolUsableInRules` で絞り込んでいること
- すべてそろっていればそのままプッシュする
- 除外リストに入っていないものがあるとき、または絞り込みが外れているときはプッシュせず、該当する技・道具と、特性・性格またはあられにしか働かないと判断した理由を伝え、除外してから進めるか、このままプッシュするかを確認する

## [世代]-first-generation ブランチの1世代ルールチェック

`[世代]-first-generation`（例: `feature/fourth-first-generation`）のプッシュを指示されたら（git-rules の `cm` の `p` も含む）、プッシュ前に、その世代で追加したポケモン・技が、悪・鋼タイプと天候のない1世代ルールに合わせてあるかを確かめる。

- 世代は英語の序数で読む: `fourth` → 4、`fifth` → 5、`sixth` → 6 …（以下、世代を N とする）
- DBは `.env` の `EXPO_PUBLIC_SUPABASE_URL`・`EXPO_PUBLIC_SUPABASE_ANON_KEY` を使って REST で数える。件数は `Prefer: count=exact` を付けたときの `content-range` の `/` の後ろ（`*/0` なら0件）

  ```bash
  set -a; source .env; set +a
  curl -s -I "$EXPO_PUBLIC_SUPABASE_URL/rest/v1/[テーブルと条件]" \
    -H "apikey: $EXPO_PUBLIC_SUPABASE_ANON_KEY" -H "Accept-Profile: moshimo" -H "Prefer: count=exact" | rg -i content-range
  ```

### 1. 悪・鋼タイプのポケモン

悪または鋼の単タイプはノーマルに、悪または鋼との複合タイプはもう一方のタイプだけの単タイプになった1世代用の行（`available_generations = 1`）があるかを確かめる。

- シード `supabase/seed/genN_pokemon_gen1_type_remap.sql` がリポジトリにあること
- その世代の悪・鋼ポケモンの数と、1世代用の行の数が一致すること（N=4 の例）
  - 悪・鋼ポケモン: `pokemon?select=id&introduced_generation=eq.4&available_generations=gte.8&or=(type1.in.(16,17),type2.in.(16,17))`
  - 1世代用の行: `pokemon?select=id&introduced_generation=eq.4&available_generations=eq.1`
- 1世代用の行に悪・鋼が残っていないこと（0件）: `pokemon?select=id&available_generations=eq.1&or=(type1.in.(16,17),type2.in.(16,17))`
- 1世代用の行で、元が単タイプなら `type1 = 1`（ノーマル）・`type2 = 0`、元が複合タイプなら悪・鋼でない方のタイプだけ（`type2 = 0`）になっていること

### 2. 悪・鋼タイプの技

悪または鋼の技がノーマルになった1世代用の行（`available_generations = 1`）があるかを確かめる。

- シードがリポジトリにあること（2・3世代は `genN_moves_gen1_type_remap.sql`、4世代以降は `genN_moves_pre_genN_type_class.sql`）
- その世代の悪・鋼の技すべてに、同じ `pokeapi_id` の1世代用の行があること（N=4 の例）
  - 悪・鋼の技: `moves?select=pokeapi_id&introduced_generation=eq.4&available_generations=gte.8&type_id=in.(16,17)`
  - 1世代用の行: `moves?select=pokeapi_id&introduced_generation=eq.4&available_generations=eq.1`
- 1世代用の行に悪・鋼が残っていないこと（0件）: `moves?select=id&available_generations=eq.1&type_id=in.(16,17)`

### 3. 天候にしか作用しない技

天候を変えるだけの技（あまごい・にほんばれ・すなあらし・あられ、およびその世代で追加された同種の技）が、1世代ルールで表示されないようになっているかを確かめる。

- `src/pokemon/rulesExclusions.ts` で、`isMoveUsableInRules` が `rulesGeneration = 1` のときにそれらの技で `false` を返すこと
- 技の一覧を取る処理（`src/pokemon/moveRepository.ts`）が、今も `isMoveUsableInRules` で絞り込んでいること

### 結果の扱い

- 1〜3がすべてそろっていればそのままプッシュする
- 足りないものがあるときはプッシュせず、足りないもの（作成または Supabase で実行が必要なシード、除外リストに足りない技など）を伝え、対応してから進めるか、このままプッシュするかを確認する
