import React, { useState, useEffect, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useApp } from "../../Context/AppContext";

function MemberCard({ id, name, image }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [memberSports, setMemberSports] = useState([]);

  const { deleteMember, sports, getSubscriptions } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberSports = async () => {
      try {
        const subscriptions = await getSubscriptions();
        const memberSubs = subscriptions.filter((sub) => sub.memberId === id);
        const subscribedSports = sports.filter((sport) =>
          memberSubs.some((sub) => sub.sportId === sport.id)
        );
        setMemberSports(subscribedSports);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchMemberSports();
  }, [id, sports, getSubscriptions]);

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
        await deleteMember(id);
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
          text: "Failed to delete the member!",
          background: "#12131a",
          color: "#ffffff",
          confirmButtonColor: "#ff0000",
        });
        console.error(error);
      }
    }
  }, [id, name, deleteMember]);

  const handleEdit = () => navigate(`/edit-member/${id}`);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div
      className="relative rounded-md w-[330px] h-[330px] md:w-[270px] md:h-[280px] justify-center flex overflow-hidden"
      style={{ boxShadow: "3px 2px 8px 0px #1b2c91" }}
    >
      <LazyLoadImage
        src={image}
        alt={name}
        effect="blur"
        className="rounded-full w-[150px] h-[150px] mt-7 m-auto object-cover"
        wrapperClassName="inset-0 z-0"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-3.5 z-20">
        <h3 className="text-[#ffffff] font-semibold text-xl tracking-wide text-center mb-2">
          {name}
        </h3>

        {memberSports.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {memberSports.map((sport) => (
              <span
                key={sport.id}
                className="text-xs bg-gradient-to-r from-blue-600 to-blue-900 text-white px-2 py-1 rounded-full shadow-md"
              >
                {sport.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xs italic">No subscriptions yet</p>
        )}
      </div>

      {/* Dropdown */}
      <div className="absolute top-2 right-2 z-30">
        <button
          onClick={toggleDropdown}
          className="text-white hover:text-[#1f47b7] transition-colors"
        >
          <FaEllipsisV size={20} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-[#12131a] rounded-md shadow-[0_0_5px_#293993] z-40">
            <button
              onClick={handleEdit}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-[#0000]/20 transition-colors"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-[#0000]/20 transition-colors"
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

export default MemberCard;
