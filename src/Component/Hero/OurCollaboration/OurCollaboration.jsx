import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const companies = [
  { name: "MasterCard", logo: "https://i.ibb.co/hPs2vHH/download.png" },
  { name: "Visa", logo: "https://i.ibb.co/7tBBVCz1/download-1.png" },
  { name: "PayPal", logo: "https://i.ibb.co/271t3mY4/download-2.png" },
  { name: "Stripe", logo: "https://i.ibb.co/LdX5SXcp/download-3.png" },
  { name: "Revolut", logo: "https://i.ibb.co/1YNQspcC/Revolut-Logo.jpg" },
  { name: "Coinbase", logo: "https://i.ibb.co/nNPLy3P0/download-5.png" },
  { name: "Payoneer", logo: "https://i.ibb.co.com/jBX782x/Payoneer.png" },
];

const OurCollaboration = () => {
  return (
    <div>
      <h1 className="text-center mt-10 md:mt-15 lg:mt-20 text-2xl sm:text-3xl md:text-4xl font-bold 
               text-primary-content mb-10 tracking-wide">
        Our Collaborations
      </h1>
      <section className="py-16 bg-transparent">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 3, spaceBetween: 10 },     // Mobile (small)
            480: { slidesPerView: 3, spaceBetween: 15 },   // Mobile (large)
            768: { slidesPerView: 4, spaceBetween: 25 },   // Tablet
            1024: { slidesPerView: 5, spaceBetween: 30 },  // Desktop
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="max-w-7xl mx-auto px-4"
        >
          {companies.map((company, i) => (
            <SwiperSlide key={i}>
              <div className="bg-base-100
                            rounded-3xl p-6 h-48 md:h-60 flex flex-col justify-between
                            border border-primary shadow-sm">

                {/* Top Icon */}
                <span className="text-3xl md:text-4xl text-primary opacity-60">❝</span>

                {/* Middle Content */}
                <div className="flex flex-col items-center py-3">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 md:w-20 md:h-20 object-contain"
                  />
                  <p className="text-lg md:text-xl font-semibold text-primary mt-2">
                    {company.name}
                  </p>
                </div>

                {/* Dotted line */}
                <div className="w-full h-[1px] border-b border-dashed border-primary/40 my-1"></div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>

  );
};

export default OurCollaboration;
