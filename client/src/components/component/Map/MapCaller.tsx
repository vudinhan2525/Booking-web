import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapCaller({
  long,
  lat,
  width,
  height,
}: {
  long: number;
  lat: number;
  width: string;
  height: string;
}) {
  return (
    <div>
      <Map long={long} width={width} height={height} lat={lat} />
    </div>
  );
}
