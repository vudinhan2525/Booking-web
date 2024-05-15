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
//return like 2024-12-27
export function convertTime(date: string) {
  var newDate = new Date(date);
  var formattedDate =
    newDate.getFullYear() +
    "-" +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + newDate.getDate()).slice(-2);
  return formattedDate;
}
export function convertTime2(isoString: string) {
  // Parse ISO string
  const date = new Date(isoString);

  // Get hours and minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Format hours and minutes
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  return formattedTime;
}
export function calculateTimeDifference(
  isoString1: string,
  isoString2: string
) {
  // Parse ISO strings into Date objects
  const date1 = new Date(isoString1);
  const date2 = new Date(isoString2);

  // Calculate time difference in milliseconds
  const timeDifferenceMs = Math.abs(date2.getTime() - date1.getTime());

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Construct and return the time difference string
  return `${hours}h ${minutes}m`;
}
export function isoStringToMonthDay(isoString: string) {
  const date = new Date(isoString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = date.getUTCMonth();
  const day = date.getUTCDate();

  const monthAbbreviation = months[monthIndex];

  return `${monthAbbreviation} ${day}`;
}
//return type like "Thu, 28 Nov"
export function convertTime3(isoString: string): string {
  // Khởi tạo đối tượng Date từ chuỗi ISO
  const date = new Date(isoString);

  // Mảng tên ngày trong tuần
  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  // Mảng tên tháng
  const monthsOfYear: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Lấy tên ngày trong tuần
  const dayOfWeek: string = daysOfWeek[date.getUTCDay()];

  // Lấy ngày
  const dayOfMonth: number = date.getUTCDate();

  // Lấy tên tháng
  const month: string = monthsOfYear[date.getUTCMonth()];

  // Tạo chuỗi định dạng theo yêu cầu
  const formattedDate: string = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  return formattedDate;
}
