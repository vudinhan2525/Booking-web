export function toDayMonthYear(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
export function formatNumber(number: number): string {
  return number.toLocaleString("en-US").replace(/,/g, ".");
}
