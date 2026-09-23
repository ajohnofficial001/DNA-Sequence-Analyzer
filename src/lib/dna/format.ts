/** Format integer counts with locale grouping (e.g. 5,821). */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Format a percentage to one decimal place (e.g. 58.3%). */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

/** Format sequence length as base pairs (e.g. 5,821 bp). */
export function formatBasePairs(length: number): string {
  return `${formatCount(length)} bp`;
}
