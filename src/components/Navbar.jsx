import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-gray-800 hover:text-pink-500 transition-all duration-300"
          style={{ textDecoration: "none" }}
        >
          👗 <span className="ml-2 text-pink-500 font-semibold">ClosetCraft</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 text-2xl focus:outline-none hover:text-pink-500 transition-colors duration-300"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium">
          <li>
            <Link
              to="/wardrobe"
              className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
              style={{ textDecoration: "none" }}
            >
              👚 Wardrobe
            </Link>
          </li>
          <li>
            <Link
              to="/outfit"
              className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
              style={{ textDecoration: "none" }}
            >
              ✨ Generate Outfit
            </Link>
          </li>
          <li>
            <Link
              to="/saved"
              className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
              style={{ textDecoration: "none" }}
            >
              💾 Saved Outfits
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="lg:hidden bg-white/40 backdrop-blur-md border-t border-white/20 px-4 pb-4 space-y-3 font-medium">
          <li>
            <Link
              to="/wardrobe"
              className="block text-gray-700 hover:text-pink-500 transition-colors duration-300"
              style={{ textDecoration: "none" }}
              onClick={() => setIsOpen(false)}
            >
              👚 Wardrobe
            </Link>
          </li>
          <li>
            <Link
              to="/outfit"
              className="block text-gray-700 hover:text-pink-500 transition-colors duration-300"
              style={{ textDecoration: "none" }}
              onClick={() => setIsOpen(false)}
            >
              ✨ Generate Outfit
            </Link>
          </li>
          <li>
            <Link
              to="/saved"
              className="block text-gray-700 hover:text-pink-500 transition-colors duration-300"
              style={{ textDecoration: "none" }}
              onClick={() => setIsOpen(false)}
            >
              💾 Saved Outfits
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
