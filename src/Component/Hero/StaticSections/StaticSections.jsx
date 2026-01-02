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
    <section className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
      {/* -------- Smart Budgeting Tips -------- */}
      <div
        className="relative border-[3px] border-primary/90 rounded-3xl p-6 sm:p-8 bg-base-100/90 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        data-aos="fade-right"
      >
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <GiMoneyStack className="text-3xl sm:text-4xl text-primary drop-shadow-sm" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary leading-snug">
            Smart Budgeting Tips
          </h2>
        </div>

        <p className="text-neutral mb-6 leading-relaxed text-sm sm:text-base">
          Build a strong foundation for your financial journey with these
          essential budgeting strategies.
        </p>

        <ul className="space-y-4">
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <GiPiggyBank className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Save at least 20% of your monthly income.
            </span>
          </li>
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <GiTakeMyMoney className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Track every expense to spot spending leaks.
            </span>
          </li>
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <GiPayMoney className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Set realistic budgets for essentials and fun.
            </span>
          </li>
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <RiSecurePaymentFill className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Keep an emergency fund ready for tough times.
            </span>
          </li>
        </ul>

        {/* Decorative overlay */}
        <div className="absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-[#FCE252]/40 to-[#708238]/20 rounded-bl-3xl blur-2xl opacity-70 pointer-events-none"></div>
      </div>

      {/* -------- Why Financial Planning Matters -------- */}
      <div
        className="relative border-[3px] border-primary/90 rounded-3xl p-6 sm:p-8 bg-base-100/90 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        data-aos="fade-left"
      >
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <RiPieChart2Fill className="text-3xl sm:text-4xl text-primary drop-shadow-sm" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary leading-snug">
            Why Financial Planning Matters
          </h2>
        </div>

        <p className="text-neutral mb-6 leading-relaxed text-sm sm:text-base">
          Financial planning empowers you to take control of your money and
          build long-term security.
        </p>

        <ul className="space-y-4">
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <RiMoneyDollarCircleFill className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Prepare for unexpected emergencies confidently.
            </span>
          </li>
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <RiLineChartFill className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Track progress toward long-term wealth goals.
            </span>
          </li>
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <GiPiggyBank className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Encourage disciplined saving and investing.
            </span>
          </li>
          <li className="flex items-start sm:items-center gap-3 transition-all">
            <RiSecurePaymentFill className="text-lg sm:text-xl text-primary" />
            <span className="text-sm text-neutral sm:text-base">
              Gain peace of mind and financial confidence.
            </span>
          </li>
        </ul>

        {/* Decorative overlay */}
        <div className="absolute bottom-0 left-0 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-tr from-[#FCE252]/30 to-[#708238]/20 rounded-tr-3xl blur-2xl opacity-70 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default StaticSections;
