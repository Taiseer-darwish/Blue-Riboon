import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import img from "../assets/images/football.jpg";

function SportsCard() {
  return (
    <div
      className="relative rounded-md w-[350px] h-[250px] p-4 overflow-hidden"
      style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
    >
      <LazyLoadImage
        src={img}
        alt="Football"
        effect="blur"
        className="rounded-md w-full h-full object-cover"
        wrapperClassName="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12131a]/5 via-[#12131a]/90 to-transparent z-10"></div>
      <div className="absolute inset-0 flex items-center  justify-center z-20">
        <h3 className="text-[#ffffff] font-bold text-5xl tracking-wide text-center">Football</h3>
      </div>
    </div>
  );
}

export default SportsCard;