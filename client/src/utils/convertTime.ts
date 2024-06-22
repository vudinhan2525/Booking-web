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
//return like 10:45
export function convertTime2(isoString: string) {
  // Parse ISO string
  const date = new Date(isoString);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

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
export function getFutureDate(isoString: string, n: number) {
  // Parse the input ISO string to a Date object
  let date = new Date(isoString);
  // Add 'n' days to the date
  date.setDate(date.getDate() + n);
  // Define an array of weekdays and months for formatting
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  // Get the components of the new date
  const dayOfWeek = weekdays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  // Format the date string
  return {
    label: `${dayOfWeek}, ${day} ${month} ${year}`,
    value: date.toString(),
  };
}
//return type like "Sun, 2 Jun 2024"
export function convertTime4(inputDate: string): string {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Adjust the day format to remove leading zero
  const [, day, month, year] = formattedDate.split(" ");
  const formattedDateWithoutLeadingZero = `${day.replace(
    /^0+/,
    ""
  )}, ${month} ${year}`;

  return formattedDateWithoutLeadingZero;
}
//return like 2024-06-03 17:10:19
export function formatISODate(isoString: string): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export function getCurISOString() {
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return localISOTime;
}
// Output: "2024-06-22"
export function getCurrentDateFormatted(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
