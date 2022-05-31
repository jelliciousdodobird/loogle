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

export type MaterialCosts = {
  initialShards: number;
  shards: number;
  destructionStones: number;
  guardianStones: number;
  leapstones: number;
  fusion: number;

  gold: number;
  silver: number;
};

export type EquipmentUpgradeData = {
  set_tier: SetTier;
  set_type: SetType;

  start_ilvl: number;
  start_lvl: number;
  end_ilvl: number;
  end_lvl: number;

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
  lvl: number,
  dataset: EquipmentUpgradeData[]
) => {
  return dataset.find(
    ({ set_tier, set_type, end_lvl }) =>
      set_tier === tier && set_type === type && end_lvl === lvl
  );
};

const getUpgradeLevelDataByILvl = (
  tier: SetTier,
  type: SetType,
  end: number
) => {};

export type UpgradeCost = {
  total_shards: number;
  total_destruction_stones: number;
  total_guardian_stones: number;
  total_leapstones: number;
  total_fusion: number;
  total_gold: number;
  total_silver: number;
};

export const getUpgradeCosts = (
  initialProbability: number,
  materialCosts: MaterialCosts
): UpgradeCost => {
  const base_probability = 0.1;
  const leapstone_cost = 8;
  const fusion_cost = 4;
  const gold_cost = 70;
  const stone_cost = 228;

  const expected_value = expectedValue(initialProbability);

  const {
    initialShards,
    shards,
    destructionStones,
    guardianStones,
    leapstones,
    fusion,
    gold,
    silver,
  } = materialCosts;

  const total_shards = initialShards + expectedCost(shards, expected_value);
  const total_destruction_stones = expectedCost(
    destructionStones,
    expected_value
  );
  const total_guardian_stones = expectedCost(guardianStones, expected_value);
  const total_leapstones = expectedCost(leapstones, expected_value);
  const total_fusion = expectedCost(fusion, expected_value);
  const total_gold = expectedCost(gold, expected_value);
  const total_silver = expectedCost(silver, expected_value);

  return {
    total_shards,
    total_destruction_stones,
    total_guardian_stones,
    total_leapstones,
    total_fusion,
    total_gold,
    total_silver,
  };
};
