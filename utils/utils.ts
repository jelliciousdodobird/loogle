import { nanoid } from "nanoid";
import { MdSyncProblem } from "react-icons/md";
// import { Position } from "../components/Map2";
// edited in POI branch
// import { Poi, PoiTypes } from "../components/PointOfInterest";
import { Poi, PoiTypes } from "../types/PointOfInterestTypes";

type Position = {
  x: number;
  y: number;
};

export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const generatePois = (numberOfPois: number) => {
  const t: Poi[] = [...Array(numberOfPois).keys()].map(() => ({
    id: nanoid(4),
    type: "island",
    position: {
      x: getRandomIntInclusive(0, 2560),
      y: getRandomIntInclusive(0, 1952),
    },
  }));

  return t;
};

export const loadImage = (
  setImageDimensions: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >,
  imageUrl: string
) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      width: img.width,
      height: img.height,
    });
  };
  img.onerror = (err) => {
    console.log("img error");
    console.error(err);
  };
};

export const ORIGIN: Position = { x: 0, y: 0 };

export const clamp = (num: number, min: number, max: number) =>
  Math.max(min, Math.min(num, max));

/**
 * The [p]robability of success on [t]rial i.
 * This probability starts at a base probability (bp)
 * and increases by 10% of bp for each trial (failure).
 * @param trial the number that represents a honing attempt.
 * @param bp the starting (base) probability (in our context, the base honing chance).
 * @returns
 */
const pt = (trial: number, bp: number) => 0.1 * bp * trial + 0.9 * bp;

/**
 * Same thing as pt() but with a maximum to handle a capped rate.
 * @param i
 * @param bp
 * @param max_p
 * @returns
 */
const ptm = (i: number, bp: number, max_p: number) =>
  Math.min(pt(i, bp), max_p);

/**
 *
 * @param start
 * @param end
 * @param fn
 * @returns
 */
const product_of_sequence = (
  start: number,
  end: number,
  fn: (i: number) => number
) => {
  let product = 1;
  for (let i = start; i <= end; i++) product *= fn(i);
  return product;
};

/**
 * px is the probability of success on trial "x" (not exactly the same as pt() ) [UNFINISHED DOC]
 * @param x is the trial number.
 * @param bp the starting (base) probability [needed for pt()].
 * @param max_p
 * @returns
 */
const px = (x: number, bp: number, max_p: number) => {
  const pf = (i: number) => 1 - ptm(i, bp, max_p);
  return ptm(x, bp, max_p) * product_of_sequence(1, x - 1, pf);
};

/**
 * The expected value is the number of trials needed to pass the honing attempt.
 * @param bp the starting (base) probability
 * @param max_p the maximum probability (capped honing rate)
 * @returns
 */
const expectedValue = (bp: number, max_p = 1) => {
  // num_of_trials_til_100_percent represents the number of times you have to hone
  // until the honing rate reaches 100% (p = 1).
  // This is NOT up until pity kicks in (pity kicks in much sooner).
  // It is just naturally where the honing rate would end up
  // if the game did not cap the rate or have a pity system
  const num_of_trials_til_100_percent = (1 - bp) / (0.1 * bp) + 1;

  const end = num_of_trials_til_100_percent;

  let sum = 0;
  for (let x = 1; x < end; x++) {
    sum += x * px(x, bp, max_p);
  }
  return sum;
};

const expectedCost = (numOfMaterials: number, numOfTrialsForSuccess: number) =>
  numOfMaterials * numOfTrialsForSuccess;

export const expectedValueNot = () => {
  const base_probability = 0.1;
  const leapstone_cost = 8;
  const fusion_cost = 4;
  const gold_cost = 70;
  const stone_cost = 228;

  const expected_value = expectedValue(base_probability);

  const total_leapstones = expectedCost(leapstone_cost, expected_value);
  const total_fusion = expectedCost(fusion_cost, expected_value);
  const total_gold = expectedCost(gold_cost, expected_value);
  const total_stone = expectedCost(stone_cost, expected_value);

  console.log("expect value", {
    expected_value,
    total_leapstones,
    total_fusion,
    total_gold,
    total_stone,
  });
};
