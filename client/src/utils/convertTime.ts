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
export function getAllDatesOfMonth(dateString: string): string[] {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const datesOfMonth: string[] = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    datesOfMonth.push(d.toISOString().split("T")[0]);
  }

  return datesOfMonth;
}
