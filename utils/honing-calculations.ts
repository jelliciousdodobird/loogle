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
  for (let x = 1; x < end + 1; x++) {
    sum += x * px(x, bp, max_p);
  }
  return sum;
};

const expectedCost = (numOfMaterials: number, numOfTrialsForSuccess: number) =>
  numOfMaterials * numOfTrialsForSuccess;

export type SetTier = "t1 302" | "t2 802" | "t3 1302" | "t3 1340";
export type SetType = "weapon" | "armor";

export type UpgradeCost = {
  shard: number;
  destruction: number;
  guardian: number;
  leapstone: number;
  fusion: number;
  gold: number;
  silver: number;
};

export type MaterialCosts = UpgradeCost & { initialShards: number };

export type EquipmentUpgradeData = {
  set_tier: SetTier;
  set_type: SetType;

  ilvl: number;
  lvl: number;

  initial_success_rate: number;
  initial_shards: number;

  trial_destructions: number;
  trial_fusion_mat: number;
  trial_gold: number;
  trial_guardians: number;
  trial_leapstones: number;
  trial_shards: number;
  trial_silver: number;

  worst_case_leapstones: number;
  best_case_shards: number;
  max_probability: number;
  max_trials: number;
};

export const getUpgradeLevelDataByLvl = (
  tier: SetTier,
  type: SetType,
  level: number,
  dataset: EquipmentUpgradeData[]
) => {
  return dataset.find(
    ({ set_tier, set_type, lvl }) =>
      set_tier === tier && set_type === type && lvl === level
  );
};

const getUpgradeLevelDataByILvl = (
  tier: SetTier,
  type: SetType,
  end: number
) => {};

export const getUpgradeCosts = (
  initialProbability: number,
  materialCosts: MaterialCosts
): UpgradeCost => {
  const expected_value = expectedValue(initialProbability);

  return {
    shard:
      materialCosts.initialShards +
      expectedCost(materialCosts.shard, expected_value),
    destruction: expectedCost(materialCosts.destruction, expected_value),
    guardian: expectedCost(materialCosts.guardian, expected_value),
    leapstone: expectedCost(materialCosts.leapstone, expected_value),
    fusion: expectedCost(materialCosts.fusion, expected_value),
    gold: expectedCost(materialCosts.gold, expected_value),
    silver: expectedCost(materialCosts.silver, expected_value),
  };
};
