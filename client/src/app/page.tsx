import Image from "next/image";
import Header from "../components/component/Header/Header";
import SearchForm from "@/components/component/Search/SearchForm";

export default function Home() {
  return (
    <div className="min-h-[100vh] bg-white">
      <Header></Header>
      <div className="relative w-full h-[600px] ">
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
        <div className="absolute top-[50%] translate-y-[-42%] left-[50%] translate-x-[-50%] w-[90%] h-[400px] ">
          <header className="text-center mb-4 text-4xl font-bold text-white">
            The world is yours to explore.
          </header>
          <SearchForm />
        </div>
      </div>
      <div className="w-[200px] h-[1000px]"></div>
    </div>
  );
}
