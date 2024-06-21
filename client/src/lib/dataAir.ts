export const airports = [
  {
    name: "Ha Noi",
    nameAirport: "HAN - Noibai International Airport",
    code: "HAN",
    image: "https://shopcartimg2.blob.core.windows.net/shopcartctn/hanoi.jpg",
  },
  {
    name: "Ho Chi Minh",
    nameAirport: "SGN - Tan Son Nhat International Airport",
    code: "SGN",
    image: "https://shopcartimg2.blob.core.windows.net/shopcartctn/tphcm.webp",
  },
  {
    name: "Da Nang",
    nameAirport: "DAD - Da Nang Airport",
    code: "DAD",
    image: "https://shopcartimg2.blob.core.windows.net/shopcartctn/danang.jpg",
  },
  {
    name: "Da Lat",
    nameAirport: "DLI - Lien Khuong Airport",
    code: "DLI",
    image: "https://shopcartimg2.blob.core.windows.net/shopcartctn/dalat.jpg",
  },
  {
    name: "Ha Long",
    nameAirport: "VDO - Van Don Airport",
    code: "VDO",
    image: "https://shopcartimg2.blob.core.windows.net/shopcartctn/halong.jpg",
  },
];
const getAirport = new Map();
airports.map((item) => {
  getAirport.set(item.code, item);
});
export { getAirport };
const getAirline = new Map();
getAirline.set(
  "Vietnam Airlines",
  "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietnamairlinelogo.jpg"
);
getAirline.set(
  "VietJet Air",
  "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg"
);
getAirline.set(
  "Jetstar Pacific",
  "https://shopcartimg2.blob.core.windows.net/shopcartctn/jetstarlogo.jpg"
);
getAirline.set(
  "Bamboo Airways",
  "https://shopcartimg2.blob.core.windows.net/shopcartctn/bambologo.jpg"
);
export { getAirline };
export const airlines = [
  {
    label: "Vietnam Airlines",
    link: "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietnamairlinelogo.jpg",
  },
  {
    label: "VietJet Air",
    link: "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg",
  },
  {
    label: "Jetstar Pacific",
    link: "https://shopcartimg2.blob.core.windows.net/shopcartctn/jetstarlogo.jpg",
  },
  {
    label: "Bamboo Airways",
    link: "https://shopcartimg2.blob.core.windows.net/shopcartctn/bambologo.jpg",
  },
];
