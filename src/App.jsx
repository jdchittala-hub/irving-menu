import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Menu/Header";
import MenuHome from "./Menu/MenuHome";
import Menu from "./Menu/Menu";
import Home from "./HomePage/Home";
import Preloader from "./Preloader/preloader";

import { refreshAuth } from "./API/api";
import ScrollToTop from "./BackArrow/ScrollTop";

import usePullToRefresh from "./hooks/usePullToRefresh";

function App() {

  const [loading, setLoading] = useState(true);

  const handleRefresh = () => {
    console.log("Refreshing...");
    setTimeout(() => {
      window.location.reload();
    }, 800); // slight delay for animation
  };

  const { pullDistance, isRefreshing } =
    usePullToRefresh(handleRefresh);

  useEffect(() => {
    refreshAuth();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fff5ea]">

      {loading && <Preloader />}

      {/* 🔥 PULL INDICATOR */}
      <div
        className="fixed top-0 left-0 w-full flex justify-center z-[1000] pointer-events-none"
        style={{
          transform: `translateY(${Math.min(pullDistance, 100)}px)`,
          transition: pullDistance === 0 ? "transform 0.3s ease" : "none",
        }}
      >
        {(pullDistance > 20 || isRefreshing) && (
          <div className="mt-2 bg-[#728D3E] text-white px-4 py-2 rounded-full shadow flex items-center gap-2">

            {/* Spinner */}
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

            <span className="text-sm">
              {isRefreshing ? "Refreshing..." : "Pull to refresh"}
            </span>

          </div>
        )}
      </div>

      <HashRouter>
        <ScrollToTop />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu-home" element={<MenuHome />} />
          <Route path="/menu/:categorySlug" element={<Menu />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;