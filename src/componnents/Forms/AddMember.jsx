import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { HiOutlineX } from "react-icons/hi";

function AddMemper() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with image:", selectedImage);
  };

  return (
    <div className="bg-[#12131a] m-auto min-h-screen p-5 flex flex-col justify-center items-center gap-9">
      <div
        className="w-[80%] m-auto mt-20 p-7 rounded-2xl relative"
        style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
      >
        <Link
          to="/members"
          className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center bg-transparent text-[#660505] shadow-[0_0_5px_#ff0000] rounded-full text-xs font-bold z-30 hover:bg-[#940909] transition-colors"
          title="Back to previous page"
        >
          <HiOutlineX size={16} />
        </Link>
        <h2 className="text-5xl text-center font-black mb-7 text-white">
          Add Member
        </h2>
        <div className="flex justify-center items-center gap-7">
          <form className="w-1/2 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="sportName"
                className="text-white text-lg mb-2 block"
              >
                Memper Name
              </label>
              <input
                id="sportName"
                className="bg-transparent rounded-2xl p-3 w-full shadow-[0_0_5px_#ff0000] text-white placeholder-gray-400"
                type="text"
                placeholder="Enter sport name"
              />
            </div>
            <div>
              <label
                htmlFor="sportImage"
                className="text-white text-lg mb-2 block"
              >
                Member Image
              </label>
              <input
                id="sportImage"
                className="bg-transparent rounded-2xl p-3 w-full shadow-[0_0_5px_#ff0000] text-white"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#1a1212] to-[#520202d4] text-white font-bold py-2 px-6 rounded-xl shadow-[0_0_5px_#fff] cursor-pointer hover:shadow-[0_0_10px_#ff0000] transition-all duration-300 mt-4"
            >
              Add Member
            </button>
          </form>
          <div
            className="relative rounded-md w-[350px] h-[250px] p-4 overflow-hidden"
            style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
          >
            {selectedImage && (
              <LazyLoadImage
                src={selectedImage}
                alt="Selected Memper"
                effect="blur"
                className="rounded-md w-full h-full object-cover"
                wrapperClassName="absolute inset-0 z-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemper;
