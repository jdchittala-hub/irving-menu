import { useEffect, useState } from "react";
import pb, { safeRequest } from "../API/api";
import { cachedRequest } from "../API/cache";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

function Mainslider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await cachedRequest("restaurant_images", () =>
          safeRequest(() =>
            pb.collection("restaurant_images").getList(1, 20, {
              sort: "-created",
            })
          )
        );

        setImages(res.items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[80vh] xl:h-[90vh] relative overflow-hidden">

      {/* Loading */}
      {images.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <p className="text-white tracking-widest animate-pulse">
            Loading...
          </p>
        </div>
      )}

      {/* Slider */}
      {images.length > 0 && (
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          loop={true}

          // ✨ ELEGANT SETTINGS
          speed={5000} // slow, smooth fade
          effect="fade"
          fadeEffect={{ crossFade: true }}

          autoplay={{
            delay: 500, // calm timing
            disableOnInteraction: false,
          }}

          className="h-full"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-full relative overflow-hidden group">

                {/* Image */}
                <img
                  src={pb.files.getUrl(item, item.images)}
                  alt="restaurant"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[7000ms] ease-out"
                />

                {/* Soft Gradient Overlay (premium look) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Mainslider;