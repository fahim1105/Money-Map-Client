import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  GiMoneyStack,
  GiTakeMyMoney,
  GiPiggyBank,
  GiPayMoney,
} from "react-icons/gi";
import {
  RiPieChart2Fill,
  RiMoneyDollarCircleFill,
  RiLineChartFill,
  RiSecurePaymentFill,
} from "react-icons/ri";

const StaticSections = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* -------- Budgeting Tips -------- */}
      <div
        className="relative  border-5 border-[#A3B18A]/90 rounded-3xl p-8 bg-white backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        data-aos="fade-right"
      >
        <div className="flex items-center gap-3 mb-6">
          <GiMoneyStack className="text-4xl text-[#708238] drop-shadow-sm" />
          <h2 className="text-3xl font-semibold text-[#1A1A1A]">
            Smart Budgeting Tips
          </h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Build a strong foundation for your financial journey with these
          essential budgeting strategies.
        </p>

        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <GiPiggyBank className="text-xl text-[#708238]" />
            <span>Save at least 20% of your monthly income.</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <GiTakeMyMoney className="text-xl text-[#708238]" />
            <span>Track every expense to spot spending leaks.</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <GiPayMoney className="text-xl text-[#708238]" />
            <span>Set realistic budgets for essentials and fun.</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <RiSecurePaymentFill className="text-xl text-[#708238]" />
            <span>Keep an emergency fund ready for tough times.</span>
          </li>
        </ul>

        {/* Decorative overlay */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#FCE252]/40 to-[#708238]/20 rounded-bl-3xl blur-2xl opacity-70 pointer-events-none"></div>
      </div>

      {/* -------- Why Financial Planning Matters -------- */}
      <div
        className="relative border-5 border-[#A3B18A]/90 rounded-3xl p-8 bg-white backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        data-aos="fade-left"
      >
        <div className="flex items-center gap-3 mb-6">
          <RiPieChart2Fill className="text-4xl text-[#708238] drop-shadow-sm" />
          <h2 className="text-3xl font-semibold text-[#1A1A1A]">
            Why Financial Planning Matters
          </h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Financial planning empowers you to take control of your money and
          build long-term security.
        </p>

        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <RiMoneyDollarCircleFill className="text-xl text-[#708238]" />
            <span>Prepare for unexpected emergencies confidently.</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <RiLineChartFill className="text-xl text-[#708238]" />
            <span>Track progress toward long-term wealth goals.</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <GiPiggyBank className="text-xl text-[#708238]" />
            <span>Encourage disciplined saving and investing.</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-[#1A1A1A] transition-all">
            <RiSecurePaymentFill className="text-xl text-[#708238]" />
            <span>Gain peace of mind and financial confidence.</span>
          </li>
        </ul>

        {/* Decorative overlay */}
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-[#FCE252]/30 to-[#708238]/20 rounded-tr-3xl blur-2xl opacity-70 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default StaticSections;
