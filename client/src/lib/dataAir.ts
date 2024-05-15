export const airports = [
  {
    name: "Ha Noi",
    nameAirport: "HAN - Noibai International Airport",
    code: "HAN",
  },
  {
    name: "Ho Chi Minh",
    nameAirport: "SGN - Tan Son Nhat International Airport",
    code: "SGN",
  },
  {
    name: "Da Nang",
    nameAirport: "DAD - Da Nang Airport",
    code: "DAD",
  },
];
const getAirport = new Map();
getAirport.set("HAN", {
  nameAirport: "HAN - Noibai International Airport",
  name: "Ha Noi",
});
getAirport.set("SGN", {
  nameAirport: "SGN - Tan Son Nhat International Airport",
  name: "Ho Chi Minh",
});
getAirport.set("DAD", {
  nameAirport: "DAD - Da Nang Airport",
  name: "Da Nang",
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
