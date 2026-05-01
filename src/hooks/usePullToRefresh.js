import { useEffect, useState } from "react";

export default function usePullToRefresh(onRefresh) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let isPulling = false;

    const threshold = 80;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        isPulling = true;
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling) return;

      currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      if (distance > 0) {
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling) return;

      if (pullDistance > threshold) {
        setIsRefreshing(true);
        onRefresh();
      }

      setPullDistance(0);
      isPulling = false;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance, onRefresh]);

  return { pullDistance, isRefreshing };
}