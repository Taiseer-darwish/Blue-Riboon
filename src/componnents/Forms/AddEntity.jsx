import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { HiOutlineX } from "react-icons/hi";
import Swal from "sweetalert2";
import { uploadImageToCloudinary } from "../../utils/uploadImage";
import EntityForm from "./EntityForm";

function AddEntity({
  entityType,
  addEntityFn,
  navigateTo,
  title,
  checkEntityExists,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const imageURL = await uploadImageToCloudinary(imageFile);
      if (!imageURL) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Image upload failed!",
          background: "#12131a",
          color: "#ffffff",
          confirmButtonColor: "#ff0000",
        });
        setIsLoading(false);
        return;
      }

      await addEntityFn(data.entityName, imageURL);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${entityType} added successfully!`,
        background: "#12131a",
        color: "#ffffff",
        confirmButtonColor: "#ff0000",
      });
      navigate(navigateTo);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred while adding the ${entityType.toLowerCase()}!`,
        background: "#12131a",
        color: "#ffffff",
        confirmButtonColor: "#ff0000",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#12131a] m-auto min-h-screen p-5 flex flex-col justify-center items-center gap-9">
      <div
        className="w-[80%] m-auto mt-20 p-7 rounded-2xl relative"
        style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
      >
        <Link
          to={navigateTo}
          className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center bg-transparent text-[#660505] shadow-[0_0_5px_#ff0000] rounded-full text-xs font-bold z-30 hover:bg-[#940909] transition-colors"
          title="Back to previous page"
        >
          <HiOutlineX size={16} />
        </Link>
        <h2 className="text-5xl text-center font-black mb-7 text-white">
          {title}
        </h2>
        <div className="flex justify-center items-center gap-7">
          <EntityForm
            entityType={entityType}
            onSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            isLoading={isLoading}
            checkEntityExists={checkEntityExists}
          />
          <div
            className="relative rounded-md w-[350px] h-[250px] p-4 overflow-hidden"
            style={{ boxShadow: "3px 2px 8px 0px #ffe8c952" }}
          >
            {selectedImage && (
              <LazyLoadImage
                src={selectedImage}
                alt={`Selected ${entityType}`}
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

export default AddEntity;