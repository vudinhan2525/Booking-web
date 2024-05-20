import {
  faCouch,
  faElevator,
  faHourglassStart,
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
];
const facilitiesRoomMap = new Map();
facilitiesRoomMap.forEach((el, idx) => {
  facilitiesRoomMap.set(el.title, el);
});
export { facilitiesRoomMap };
