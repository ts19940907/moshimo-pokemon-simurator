import type { ImageSourcePropType } from "react-native";

import type { Generation } from "./types";

const grassland = require("../../assets/title/title-grassland.png");
const kanto = require("../../assets/title/title-kanto.png");
const johto = require("../../assets/title/title-johto.png");
const hoenn = require("../../assets/title/title-hoenn.png");

/** Default background before a match generation is chosen (title / menu). */
export const defaultMatchBackground = grassland;

/** Background keyed by battle rules generation. Gen 4+ falls back until assets exist. */
const BACKGROUNDS: Partial<Record<Generation, ImageSourcePropType>> = {
  1: kanto,
  2: johto,
  3: hoenn,
};

export function matchBackgroundForRules(
  rulesGeneration: Generation | number,
): ImageSourcePropType {
  const gen = Number(rulesGeneration) as Generation;
  return BACKGROUNDS[gen] ?? grassland;
}
