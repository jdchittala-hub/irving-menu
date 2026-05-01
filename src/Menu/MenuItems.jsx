import pb from "../API/api";
import { useState } from "react";

function MenuItems({
  items,
  loading,
  setSelectedItem,
  activeCategory,
}) {

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading items...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        No items available
      </div>
    );
  }

  const today = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  const manualCategoryOff =
    activeCategory?.unavailable === true;

  const categoryUnavailableDays =
    activeCategory?.unavailableDays || [];

  const dayBasedOff =
    categoryUnavailableDays.includes(today);

  const categoryOff =
    manualCategoryOff || dayBasedOff;

  const sortedItems = [...items].sort((a, b) => {
    const aOff = a?.unavailable === true;
    const bOff = b?.unavailable === true;

    if (aOff === bOff) return 0;
    if (aOff) return 1;
    return -1;
  });

  return (
    <div className="
      grid 
      grid-cols-2
      md:grid-cols-3
      xl:grid-cols-3
      2xl:grid-cols-4
      gap-4 sm:gap-5 md:gap-6
      p-3 sm:p-4 md:p-6
    ">

      {sortedItems.map((item) => {

        const itemOff = item?.unavailable === true;
        const isDisabled = categoryOff || itemOff;

        let label = null;
        if (categoryOff) label = "Unavailable Today";
        else if (itemOff) label = "Unavailable";

        return (
          <MenuCard
            key={item.id}
            item={item}
            isDisabled={isDisabled}
            label={label}
            setSelectedItem={setSelectedItem}
          />
        );
      })}
    </div>
  );
}

export default MenuItems;



// 🔥 CARD COMPONENT
function MenuCard({ item, isDisabled, label, setSelectedItem }) {
  const [loaded, setLoaded] = useState(false);

  const fallbackImage = "/assets/dummyImage.jpeg"; // ✅ correct path

  const [imgSrc, setImgSrc] = useState(
    item.image
      ? pb.files.getUrl(item, item.image)
      : fallbackImage
  );

  return (
    <div
      onClick={() => {
        if (isDisabled) return;
        setSelectedItem(item);
      }}
      className={`
        bg-white rounded-3xl overflow-hidden shadow-lg
        transition duration-300
        ${isDisabled
          ? "opacity-60 cursor-not-allowed"
          : "cursor-pointer hover:scale-105"}
      `}
    >

      <div className="relative">

        {/* Skeleton */}
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
        )}

        {/* Image */}
        <img
          src={imgSrc}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setImgSrc(fallbackImage); // ✅ fallback works now
            setLoaded(true);
          }}
          className={`
            w-full
            h-[180px] sm:h-[200px] md:h-[220px] xl:h-[350px]
            object-cover
            transition-all duration-500
            z-10 relative
            ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        />

        {/* Overlay */}
        {isDisabled && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="bg-[#CD7D1C] px-4 py-1 rounded-full text-white text-xs sm:text-sm">
              {label}
            </span>
          </div>
        )}

      </div>

      <div className="p-3 sm:p-4 text-center">
        <h3 className="font-semibold text-[#7a4b18] text-sm sm:text-base">
          {item.name}
        </h3>

        <p className="text-green-700 font-bold mt-1 text-sm sm:text-base">
          ${item.price}
        </p>
      </div>

    </div>
  );
}