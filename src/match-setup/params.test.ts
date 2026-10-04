import { describe, expect, it } from "vitest";

import { selectableGenerations } from "./options";
import {
  itemGenerationFilterFromParams,
  matchGenerationRouteParams,
  moveGenerationFilterFromParams,
  pokemonGenerationFilterFromParams,
} from "./params";

describe("manual generation pools", () => {
  it("keeps checked generations as a manual filter", () => {
    const params = matchGenerationRouteParams({
      rulesGeneration: 3,
      syncGenerationsWithRules: false,
      pokemonGenerations: [1, 2],
      moveGenerations: [3],
      itemGenerations: [2],
    });

    expect(pokemonGenerationFilterFromParams(params)).toEqual({
      syncWithRules: false,
      rulesGeneration: 3,
      introducedGenerations: [1, 2],
    });
    expect(moveGenerationFilterFromParams(params).syncWithRules).toBe(false);
    expect(itemGenerationFilterFromParams(params).syncWithRules).toBe(false);
  });

  it("treats an unchecked category as following the rules generation", () => {
    const params = matchGenerationRouteParams({
      rulesGeneration: 3,
      syncGenerationsWithRules: false,
      pokemonGenerations: [],
      moveGenerations: [1, 2, 3],
      itemGenerations: [],
    });

    expect(pokemonGenerationFilterFromParams(params)).toEqual({
      syncWithRules: true,
      rulesGeneration: 3,
      introducedGenerations: [],
    });
    expect(moveGenerationFilterFromParams(params).syncWithRules).toBe(false);
    expect(itemGenerationFilterFromParams(params).syncWithRules).toBe(true);
  });

  it("falls back to Gen1 for legacy routes without generation lists", () => {
    expect(
      pokemonGenerationFilterFromParams({
        rulesGeneration: "2",
        syncGenerationsWithRules: "0",
        pokemonGeneration: "2",
      }),
    ).toEqual({
      syncWithRules: false,
      rulesGeneration: 2,
      introducedGenerations: [2],
    });
  });
});

describe("selectableGenerations", () => {
  it("skips unimplemented generations", () => {
    expect(
      selectableGenerations([
        { value: 1, disabled: false },
        { value: 2, disabled: false },
        { value: 4, disabled: true },
      ]),
    ).toEqual([1, 2]);
  });
});
