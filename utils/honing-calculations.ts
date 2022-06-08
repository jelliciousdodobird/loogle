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
 *
 * @param trial must be greater than 0
 * @param base_rate
 * @returns
 */
const failure_bonus_rate = (trial: number, base_rate: number) =>
  0.1 * base_rate * (trial - 1);

const additional_mats_rate = (base_rate: number) => 0;

const options = {
  stronghold_research_honing_buff_rate: 0,
  stronghold_research_initial_shards_reduction_rate: 0,
  additional_mats_rate: 0,
  book_rate: 0,
  general_honing_buff_rate: 0,
  general_material_reduction_rate: 0,
};

const pi = (trial: number, base_rate: number) => {
  const br = base_rate;
  const fb = Math.min(failure_bonus_rate(trial, base_rate), base_rate);
  const am = Math.min(additional_mats_rate(base_rate), base_rate);
  const bk = 0;
  const res = 0;

  return br + fb + am;
};

const px = (x: number, base_rate: number) => {
  const pf = (i: number) => 1 - pi(i, base_rate);
  return pi(x, base_rate) * product_of_sequence(1, x - 1, pf);
};

const max_num_of_trials = (base_rate: number) => {
  let artisan = 0;
  let trial = 1;
  while (artisan < 1) {
    artisan += pi(trial, base_rate) * 0.465;
    // console.log(trial, artisan);
    trial++;
  }

  return trial;
};

export const expected_value = (base_rate: number) => {
  // num_of_trials_til_100_percent represents the number of times you have to hone
  // until the honing rate reaches 100% (p = 1).
  // This is NOT up until pity kicks in (pity kicks in much sooner).
  // It is just naturally where the honing rate would end up
  // if the game did not cap the rate or have a pity system
  const num_of_trials_til_100_percent = (1 - base_rate) / (0.1 * base_rate) + 1;

  const end = max_num_of_trials(base_rate);

  let sum = 0;
  const sx_arr = [];

  for (let x = 1; x < end; x++) {
    const sx = px(x, base_rate);
    sum += x * sx;
    sx_arr.push(sx);
  }

  const sumSX = sx_arr.reduce((prev, curr) => prev + curr, 0);
  sum += 1 - sumSX;
  return sum;
};
