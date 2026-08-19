import type { ImageSourcePropType } from "react-native";

import type { Generation } from "./types";

const grassland = require("../../assets/title/title-grassland.png");
const kanto = require("../../assets/title/title-kanto.png");

/** Default background before a match generation is chosen (title / menu). */
export const defaultMatchBackground = grassland;

/** Background keyed by battle rules generation. Gen 2+ falls back until assets exist. */
const BACKGROUNDS: Partial<Record<Generation, ImageSourcePropType>> = {
  1: kanto,
};

export function matchBackgroundForRules(
  rulesGeneration: Generation | number,
): ImageSourcePropType {
  const gen = Number(rulesGeneration) as Generation;
  return BACKGROUNDS[gen] ?? grassland;
}
