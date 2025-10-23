// src/components/Nav.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiCalendar, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { to: "/sports", icon: <FiHome className="text-lg" />, label: "Sports" },
  { to: "/members", icon: <FiUsers className="text-lg" />, label: "Members" },
  {
    to: "/subscriptions",
    icon: <FiCalendar className="text-lg" />,
    label: "Subscriptions",
  },
];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-container")) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-md sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900">
          Blue Ribbon Club
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-950 text-white shadow-lg shadow-blue-400/15"
                    : "text-gray-200 hover:bg-blue-800 hover:text-white"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Burger Icon + Mobile Menu */}
        <div className="md:hidden relative menu-container">
          <button
            className="text-2xl"
            onClick={(e) => {
              e.stopPropagation(); // منع الغلق الفوري
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {menuOpen && (
            <div
              className="absolute top-12 right-0 bg-gray-900 text-white rounded-xl shadow-lg w-48 flex flex-col py-2 animate-fadeIn menu-container"
              style={{
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-950 text-white shadow-lg shadow-blue-400/30"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </nav>
  );
}

export default Nav;
