export const destinations = [
  {
    code: "DAD",
    name: "Đà Nẵng",
    title: "Vietnam",
    lat: 16.0482957629242,
    long: 108.21930463520579,
  },
  {
    code: "DAL",
    name: "Đà Lạt",
    title: "Lam Dong Province, Vietnam",
    lat: 11.9390702537227,
    long: 108.45037164810502,
  },
  {
    code: "HAN",
    name: "Hà Nội",
    title: "Ha Noi, Vietnam",
    lat: 21.022574406809944,
    long: 105.8349024951491,
  },
  {
    code: "SGN",
    name: "Thành phố Hồ Chí Minh",
    title: "Ho Chi Minh City, Vietnam",
    lat: 10.797752036781176,
    long: 106.6675132954067,
  },
  {
    code: "NAT",
    name: "Nha Trang",
    title: "Khanh Hoa Province, Vietnam",
    lat: 12.265082235270942,
    long: 109.18720127855156,
  },
  {
    code: "HAL",
    name: "Hạ Long",
    title: "Quang Ninh Province, Vietnam",
    lat: 20.954999847559748,
    long: 107.04351526674577,
  },
];
const destinationsMap = new Map();
destinations.forEach((el, idx) => {
  destinationsMap.set(el.code, el);
});
export { destinationsMap };
export const accomodationType = [
  "Homes",
  "Others",
  "Hotels",
  "Apartments",
  "Guest Houses",
  "B&B",
  "Resorts",
  "Homestays",
  "Hostels",
  "Villas",
];
