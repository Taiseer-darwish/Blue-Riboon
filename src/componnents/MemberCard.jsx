import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import img from "../assets/images/football.jpg";

function MemberCard() {
  return (
    <div
      className="relative rounded-md w-[300px] h-[260px] justify-center  flex overflow-hidden"
      style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
    >
      <LazyLoadImage
        src={img}
        alt="Football"
        effect="blur"
        className="rounded-full w-[150px] h-[150px] mt-7 m-auto object-cover"
        wrapperClassName=" inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#12131a]/95 via-[#12131a]/30 to-transparent z-10"></div>
      <div className="absolute inset-0 flex items-end p-3.5  justify-center z-20">
        <h3 className="text-[#ffffff] font-semibold text-xl tracking-wide text-center">
          Mohamed Salah
        </h3>
      </div>
    </div>
  );
}

export default MemberCard;
