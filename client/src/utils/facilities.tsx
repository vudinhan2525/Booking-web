import { BalconyIcon, CosmeticIcon } from "@/lib/icon";
import {
  faBath,
  faCartShopping,
  faCouch,
  faElevator,
  faHotTubPerson,
  faHourglassStart,
  faMugSaucer,
  faShower,
  faSnowflake,
  faSquareParking,
  faUtensils,
  faWaterLadder,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const facilities = [
  {
    title: "AC",
    icon: <FontAwesomeIcon icon={faSnowflake} className="text-primary-color" />,
  },
  {
    title: "Restaurant",
    icon: <FontAwesomeIcon icon={faUtensils} className="text-primary-color" />,
  },
  {
    title: "Swimming pool",
    icon: (
      <FontAwesomeIcon icon={faWaterLadder} className="text-primary-color" />
    ),
  },
  {
    title: "24-Hour Front Desk",
    icon: (
      <FontAwesomeIcon icon={faHourglassStart} className="text-primary-color" />
    ),
  },
  {
    title: "Parking",
    icon: (
      <FontAwesomeIcon icon={faSquareParking} className="text-primary-color" />
    ),
  },
  {
    title: "Elevator",
    icon: <FontAwesomeIcon icon={faElevator} className="text-primary-color" />,
  },
  {
    title: "Wifi",
    icon: <FontAwesomeIcon icon={faWifi} className="text-primary-color" />,
  },
  {
    title: "Coffee shop",
    icon: <FontAwesomeIcon icon={faMugSaucer} className="text-primary-color" />,
  },
  {
    title: "Grocery",
    icon: (
      <FontAwesomeIcon icon={faCartShopping} className="text-primary-color" />
    ),
  },
  {
    title: "Beauty salon",
    icon: CosmeticIcon({ height: "17px", width: "17px" }),
  },
];
const facilitiesMap = new Map();
facilities.forEach((el, idx) => {
  facilitiesMap.set(el.title, el);
});
export default facilitiesMap;

export const facilitiesRoom = [
  {
    title: "Shower",
    icon: <FontAwesomeIcon icon={faShower} className="text-primary-color" />,
  },
  {
    title: "Seating area",
    icon: <FontAwesomeIcon icon={faCouch} className="text-primary-color" />,
  },
  {
    title: "Air conditioning",
    icon: <FontAwesomeIcon icon={faSnowflake} className="text-primary-color" />,
  },
  {
    title: "Hot water",
    icon: (
      <FontAwesomeIcon icon={faHotTubPerson} className="text-primary-color" />
    ),
  },
  {
    title: "Wifi",
    icon: <FontAwesomeIcon icon={faWifi} className="text-primary-color" />,
  },
  {
    title: "Bathtub",
    icon: <FontAwesomeIcon icon={faBath} className="text-primary-color" />,
  },
  {
    title: "Refrigerator",
    icon: <FontAwesomeIcon icon={faSnowflake} className="text-primary-color" />,
  },
  {
    title: "Balcony",
    icon: BalconyIcon({ height: "17px", width: "17px" }),
  },
];
const facilitiesRoomMap = new Map();
facilitiesRoom.forEach((el, idx) => {
  facilitiesRoomMap.set(el.title, el);
});
export { facilitiesRoomMap };
