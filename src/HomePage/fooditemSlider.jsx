import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import pb, { safeRequest } from "../API/api";
import { cachedRequest } from "../API/cache";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { slugify } from "../Utilis/slugify";

function FooditemSlider() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await cachedRequest("new_food_items", () =>
          safeRequest(() =>
            pb.collection("food_item").getList(1, 20, {
              filter: "new_addition=true",
              sort: "-created",
              expand: "categoryId",
            })
          )
        );
        setItems(res.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (items.length === 0) return <div className="text-white text-center py-10">No items 😢</div>;

  return (
    <div className="relative w-full h-full">

      <div className="swiper-button-prev !text-white z-20"></div>
      <div className="swiper-button-next !text-white z-20"></div>

      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        speed={1000}
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-full h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() =>
                navigate(`/menu/${slugify(item.expand?.categoryId?.name)}`)
              }
              className="relative w-full h-full overflow-hidden cursor-pointer group"
            >
              <img
                src={pb.files.getUrl(item, item.image)}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                alt={item.name}
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute top-0 w-full bg-black/40 backdrop-blur-md px-4 py-3 text-white text-center">
                <h2 className="text-sm sm:text-lg md:text-xl font-bold">
                  {item.name}
                </h2>
              </div>

              <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md px-4 py-3 text-white text-center text-sm sm:text-lg md:text-xl font-bold">
                New Additions
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FooditemSlider;