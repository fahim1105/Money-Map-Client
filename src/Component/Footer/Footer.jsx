import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import FooterIMG from "../../assets/IMG_0644.jpeg";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${FooterIMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="text-neutral mt-16 relative z-10"
    >
      {/* Subscribe Bar */}
      <div
        className="
          bg-primary rounded-t-2xl 
          w-[90%] md:w-[80%] mx-auto 
          flex flex-col md:flex-row 
          items-center md:items-center 
          justify-between 
          px-6 py-5 shadow-lg 
          -translate-y-10 relative z-20 
          gap-3
        "
      >
        <h3
          className="
            text-base-100 font-semibold text-lg 
            mb-3 md:mb-0 
            text-center md:text-left 
            w-full
          "
        >
          Subscribe to our Web-App
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
            Swal.fire({
              title: "Subscribed!",
              text: "Thanks for joining our web-app.",
              icon: "success",
              confirmButtonColor: "#2c54f5",
            });
          }}
          className="w-full md:w-[50%]"
        >
          <div
            className="
      flex flex-col md:flex-row 
      bg-base-100 rounded-2xl 
      p-2 
      gap-2 md:gap-0 
      w-full shadow-sm
    "
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="
        flex-grow px-4 py-3 
        text-neutral 
        rounded-xl md:rounded-l-xl md:rounded-r-none
        border md:border-none
        focus:outline-none
      "
            />

            <button
              type="submit"
              className="
        bg-primary text-base-100 
        px-6 py-3 
        font-semibold 
        rounded-xl md:rounded-l-none md:rounded-r-xl
        w-full md:w-auto
        hover:bg-[#5c6d2f] transition
      "
            >
              Subscribe
            </button>
          </div>
        </form>


      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 pb-12 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <Link to="/">
            <h2 className="text-secondary text-3xl font-bold mb-4">Money Map</h2>
          </Link>
          <p className="text-sm text-accent leading-relaxed">
            Track. Save. Grow. <br />
            Manage your finances smartly with Money Map.
          </p>
        </div>

        <div>
          <h3 className="text-secondary font-semibold mb-4">RESOURCES</h3>
          <ul className="space-y-2 text-sm text-accent">
            <li>
              <Link to="/documentation">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="system">
                Systems
              </Link>
            </li>
            <li>
              <Link to="/#faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-secondary font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm text-accent">
            <li>
              <Link to="/about-us">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/press">
                Press
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-secondary font-semibold mb-4">SOCIAL</h3>
          <ul className="space-y-2 text-sm text-accent">
            <li><a href="https://www.facebook.com/aaff.115">Facebook</a></li>
            <li><a href="https://www.instagram.com/aaff.115">Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/aaff115">LinkedIn</a></li>
          </ul>
          <div className="flex gap-4 mt-4 text-lg text-black">
            <a href="https://www.facebook.com/aaff.115" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/aaff.115" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/aaff115" className="hover:text-blue-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-black py-4 text-center text-sm text-base-100">
        © {new Date().getFullYear()} Money Map — All rights reserved.
      </div>
      <div className="border-t border-black py-2 text-center text-sm text-base-100">
        App Version: v2.1.2
      </div>
    </footer>
  );
};

export default Footer;
