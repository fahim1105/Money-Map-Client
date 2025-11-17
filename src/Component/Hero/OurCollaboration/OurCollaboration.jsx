import React from "react";
import { motion, useAnimation } from "framer-motion";

const companies = [
  { name: "MasterCard", logo: "https://i.ibb.co/hPs2vHH/download.png" },
  { name: "Visa", logo: "https://i.ibb.co/7tBBVCz1/download-1.png" },
  { name: "PayPal", logo: "https://i.ibb.co/271t3mY4/download-2.png" },
  { name: "Stripe", logo: "https://i.ibb.co/LdX5SXcp/download-3.png" },
  { name: "American Express", logo: "https://i.ibb.co/ZRKCzWdX/download-4.png" },
  { name: "Revolut", logo: "https://i.ibb.co/1YNQspcC/Revolut-Logo.jpg" },
  { name: "Coinbase", logo: "https://i.ibb.co/nNPLy3P0/download-5.png" },
];

const OurCollaboration = () => {
  const controls = useAnimation();

  const marqueeAnimation = {
    x: ["0%", "-50%"],
    transition: {
      repeat: Infinity,
      duration: 25,
      ease: "linear",
    },
  };

  // Start animation on mount
  React.useEffect(() => {
    controls.start(marqueeAnimation);
  }, []);

  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white/90 mb-4">
          Our Collaboration
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg sm:text-xl">
          We partner with some of the world’s leading financial companies to
          bring you the best services.
        </p>
      </motion.div>

      {/* Marquee */}
      <div
        className="overflow-hidden relative w-full"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start(marqueeAnimation)}
      >
        <motion.div
          animate={controls}
          className="flex w-[200%] space-x-8 items-center"
        >
          {companies.concat(companies).map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-36 h-36 sm:w-40 sm:h-40 flex flex-col items-center justify-center rounded-xl bg-white shadow-lg"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2"
              />
              <p className="text-gray-800 text-lg sm:text-xl font-semibold text-center">
                {company.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurCollaboration;
