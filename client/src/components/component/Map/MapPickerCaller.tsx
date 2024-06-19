import { LatLng } from "leaflet";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/component/Map/MapPicker"), {
  ssr: false,
});

interface MapPickerProps {
  onLocationSelect: (latlng: LatLng) => void;
  iniLong: number;
  iniLat: number;
}
export default function MapPickerCaller({
  onLocationSelect,
  iniLong,
  iniLat,
}: MapPickerProps) {
  return (
    <Map
      onLocationSelect={onLocationSelect}
      iniLat={iniLat}
      iniLong={iniLong}
    />
  );
}
