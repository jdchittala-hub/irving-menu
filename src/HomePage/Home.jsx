import FooditemSlider from "./fooditemSlider";
import ExploreDishes from "./exploreDishes";
import Mainslider from "./mainslider";
import NoticeSlider from "./noticeSlider";

import bgImage from "../../public/assets/image/beige-bg.jpg";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center w-full flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-black/20" />

      <div className="relative z-10 px-3 sm:px-4 md:px-6 py-4 w-full">
        {/* TOP */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <Mainslider />
        </div>

        <div className="mt-6 rounded-2xl overflow-hidden">
          <NoticeSlider />
        </div>

        {/* 🔥 MAIN SECTION */}
        {/* 🔥 MAIN SECTION */}
        <div
          className="
    mt-8
    flex flex-col [@media(min-width:500px)]:flex-row
    w-full

    h-auto
    [@media(min-width:500px)]:h-[500px]   /* 🔥 parent height */

    lg:h-[550px]
    xl:h-[650px]

    rounded-2xl overflow-hidden
    bg-white/10 backdrop-blur-lg
    border border-white/20
    items-stretch   /* 🔥 IMPORTANT */
  "
        >
          {/* LEFT */}
          <div
            className="
    w-full 
    [@media(min-width:500px)]:w-1/2 
    h-[250px] 
    [@media(min-width:500px)]:h-full   /* 🔥 same height */
  "
          >
            <FooditemSlider />
          </div>

          {/* DIVIDER */}
          <div className="hidden [@media(min-width:500px)]:block w-[1px] bg-black/30"></div>

          {/* RIGHT */}
          <div
            className="
    w-full 
    [@media(min-width:500px)]:w-1/2 
    h-[250px]   /* 🔥 same as left (mobile) */
    [@media(min-width:500px)]:h-full   /* 🔥 same height */
  "
          >
            <ExploreDishes />
          </div>
        </div>
      </div>
    </div>
  );
}
