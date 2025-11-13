// src/components/Banner.jsx
import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 3500, once: true, easing: "ease-in-out" });
  }, []);

  const slides = [
    {
      id: 1,
      title: "Take Control of Your Finances",
      subtitle:
        "Track your income, plan your budget, and build financial freedom — all in one place.",
      img: "https://i.ibb.co.com/DgwzhYty/w-a-qd-D8l-MOE1n-M-unsplash.jpg",
    },
    {
      id: 2,
      title: "Plan Today, Prosper Tomorrow",
      subtitle:
        "Set smart financial goals and achieve them with real-time insights and reports.",
      img: "https://i.ibb.co.com/ynGGKHdm/markus-spiske-Xr-If-Y-4c-K1w-unsplash.jpg",
    },
    {
      id: 3,
      title: "Budget Smarter, Live Better",
      subtitle:
        "Make smarter spending decisions and take charge of your financial future.",
      img: "https://i.ibb.co.com/FkQCW3Sv/frugal-flyer-Vbd-Unqoe5-UU-unsplash.jpg",
    },
    {
      id: 4,
      title: "Track. Save. Grow.",
      subtitle:
        "FinEase helps you stay organized, focused, and financially empowered every day.",
      img: "https://i.ibb.co.com/S4L8HPPL/iryna-tysiak-k-Ra-H720-CCRE-unsplash.jpg",
    },
  ];

  return (
    <section className="w-full text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex justify-center items-center h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text Content */}
              <div
                className="relative z-10 text-center px-4 sm:px-6 md:px-10 max-w-3xl mx-auto"
                data-aos="fade-up"
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-base-200 mb-6 sm:mb-8">
                  {slide.subtitle}
                </p>

                <Link
                  to="/add-transaction"
                  className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-lg font-semibold text-white shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(90deg, #708238 0%, #A3B18A 100%)",
                  }}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
