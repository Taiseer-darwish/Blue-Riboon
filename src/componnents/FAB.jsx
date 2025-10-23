import React from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";

function FAB({ to }) {
  return (
    <Link to={to}>
      <button className="fixed z-50 bottom-6 right-3 cursor-pointer bg-gradient-to-b from-[#111218] to-[#05418a] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all">
        <TiPlus size={22}/>
      </button>
    </Link>
  );
}

export default FAB;
