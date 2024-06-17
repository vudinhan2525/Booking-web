// components/MapPicker.tsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLng } from "leaflet";

// Fix icon issues with Leaflet in React
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface LocationMarkerProps {
  onLocationSelect: (latlng: LatLng) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({
  onLocationSelect,
}) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

interface MapPickerProps {
  onLocationSelect: (latlng: LatLng) => void;
  iniLong: number;
  iniLat: number;
}

const MapPicker: React.FC<MapPickerProps> = ({
  onLocationSelect,
  iniLong,
  iniLat,
}) => {
  return (
    <MapContainer
      center={[iniLat, iniLong]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default MapPicker;
