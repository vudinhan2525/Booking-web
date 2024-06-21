import Image from "next/image";
import SearchForm from "@/components/component/Search/SearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MostPopularFlight from "./_component/MostPopularFlight";

export default function Home() {
  return (
    <div className="min-h-[100vh] bg-white">
      <div className="relative w-full h-[550px]">
        <Image
          src={
            "https://shopcartimg2.blob.core.windows.net/shopcartctn/main-bg-2.jpg"
          }
          alt="mainbg"
          quality={70}
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        ></Image>
        <div className="absolute px-24 top-[50%] z-[10] translate-y-[-42%] left-[50%] translate-x-[-50%] w-full h-[400px] ">
          <header className="text-center mt-4 mb-4 text-4xl font-bold text-white">
            The world is yours to explore.
          </header>
          <SearchForm />
        </div>
      </div>
      <div className="py-12 h-[1000px] px-24">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Most popular flights</h1>
          <div>
            <FontAwesomeIcon
              icon={faStar}
              className="text-3xl text-primary-color"
            />
          </div>
        </div>
        <MostPopularFlight />
      </div>
    </div>
  );
}
