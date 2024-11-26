import React from "react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pink-700 text-white py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">Download our aiensured note app</h2>
        <p className="text-sm mt-2">Add notes. All day, every day.</p>
      </div>
      <div className="flex justify-center gap-4 mb-6">
        <a
          href="#"
          className="bg-white text-black px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play Store"
            className="w-28 h-12"
          />
        </a>
        <a
          href="#"
          className="bg-white text-black px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple Store"
            className="w-12 h-12"
          />
        </a>
      </div>
      <div className="text-center text-sm border-t border-gray-700 pt-4">
      <p>&copy; {currentYear} aiensured. All rights reserved.</p>
        <nav className="flex justify-center gap-4 mt-2 text-gray-400">
          <Link to={"/about"} className="hover:text-white">
            About us
          </Link>
          <Link to={"/contact"} className="hover:text-white">
            Contact us
          </Link>
          <Link to={""} className="hover:text-white">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default LandingFooter;
