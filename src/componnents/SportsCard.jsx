import React, { useState, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaEllipsisV, FaTrash,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useApp } from "../Context/AppContext";

function SportsCard({ id, name, image }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { deleteSport } = useApp();
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${name}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#12131a",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      try {
        await deleteSport(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${name} has been deleted.`,
          background: "#12131a",
          color: "#ffffff",
          confirmButtonColor: "#ff0000",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the sport!",
          background: "#12131a",
          color: "#ffffff",
          confirmButtonColor: "#ff0000",
        });
        console.error(error);
      }
    }
  }, [id, name, deleteSport]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div
      className="relative rounded-md w-[350px] h-[250px] p-4 overflow-hidden"
      style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
    >
      <LazyLoadImage
        src={image}
        alt={name}
        effect="blur"
        className="rounded-md w-full h-full object-cover"
        wrapperClassName="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12131a]/5 via-[#12131a]/90 to-transparent z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h3 className="text-[#ffffff] font-bold text-5xl tracking-wide text-center">
          {name}
        </h3>
      </div>
      <div className="absolute top-2 right-2 z-30">
        <button
          onClick={toggleDropdown}
          className="text-white hover:text-[#ff0000] transition-colors"
        >
          <FaEllipsisV size={20} />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-[#12131a] rounded-md shadow-[0_0_5px_#ff0000] z-40">
            <button
              onClick={handleDelete}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-[#ff0000]/20 transition-colors"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SportsCard;