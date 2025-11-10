// src/components/HeroSimple.jsx
import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="flex items-center justify-center text-center pt-20 px-4  ">
      <div className="max-w-3xl text-white">
        <h1
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-4"
          data-aos="fade-up"
        >
          Take Control of Your{" "}
          <span className="text-[#FCE252]">Finances</span>
        </h1>

        <p className="text-sm md:text-lg text-[#F3F4F6] mb-6" data-aos="fade-up" data-aos-delay="100">
          Track your income, plan your budget, and build financial freedom — all in one place.
        </p>

        <Link
          to="/add-transition"
          className="inline-block px-6 py-3 rounded-full text-lg font-semibold text-white shadow-md hover:shadow-lg transition"
          style={{ background: "linear-gradient(90deg, #708238 0%, #A3B18A 100%)" }}
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Banner;
