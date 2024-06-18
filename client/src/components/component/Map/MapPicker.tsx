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
  position: LatLng | null;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({
  onLocationSelect,
  position,
}) => {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(position);

  useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  useEffect(() => {
    setMarkerPosition(position);
  }, [position]);

  return markerPosition === null ? null : (
    <Marker position={markerPosition}></Marker>
  );
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
  const initialPosition = new LatLng(iniLat, iniLong);
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(
    initialPosition
  );

  useEffect(() => {
    setCurrentPosition(initialPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iniLat, iniLong]);

  const handleLocationSelect = (latlng: LatLng) => {
    setCurrentPosition(latlng);
    onLocationSelect(latlng);
  };

  return (
    <MapContainer
      center={currentPosition || initialPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker
        onLocationSelect={handleLocationSelect}
        position={currentPosition}
      />
    </MapContainer>
  );
};

export default MapPicker;
