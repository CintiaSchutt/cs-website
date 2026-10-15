const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2019-04" -> "Apr 2019". Falls back to the raw value if it is not "YYYY-MM". */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  const name = MONTHS[Number(month) - 1];
  return year && name ? `${name} ${year}` : value;
}
