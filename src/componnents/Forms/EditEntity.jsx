import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { HiOutlineX } from "react-icons/hi";
import Swal from "sweetalert2";
import { uploadImageToCloudinary } from "../../utils/uploadImage";
import EntityForm from "./EntityForm";
import { useApp } from "../../Context/AppContext";

function EditEntity({
  entityType,
  updateEntityFn,
  navigateTo,
  title,
  checkEntityExists,
}) {
  const { id } = useParams();
  const { sports, members, loading } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [initialName, setInitialName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && id) {
      const entity =
        entityType === "Sport"
          ? sports.find((s) => s.id === id)
          : members.find((m) => m.id === id);
      if (entity) {
        setInitialName(entity.name);
        setSelectedImage(entity.imageURL);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${entityType} not found!`,
          background: "#12131a",
          color: "#ffffff",
          confirmButtonColor: "#ff0000",
        });
        navigate(navigateTo);
      }
    }
  }, [id, entityType, sports, members, loading, navigate, navigateTo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (data) => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid sport ID!",
        background: "#12131a",
        color: "#ffffff",
        confirmButtonColor: "#ff0000",
      });
      return;
    }

    setIsLoading(true);
    try {
      const imageURL = imageFile
        ? await uploadImageToCloudinary(imageFile)
        : selectedImage;
      if (!imageURL) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Image is required!",
          background: "#12131a",
          color: "#ffffff",
          confirmButtonColor: "#ff0000",
        });
        setIsLoading(false);
        return;
      }

      await updateEntityFn(id, { name: data.entityName, imageURL });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${entityType} updated successfully!`,
        background: "#12131a",
        color: "#ffffff",
        confirmButtonColor: "#ff0000",
      });
      navigate(navigateTo);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred while updating the ${entityType.toLowerCase()}!`,
        background: "#12131a",
        color: "#ffffff",
        confirmButtonColor: "#ff0000",
      });
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !id) {
    return (
      <div className="bg-[#12131a] min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

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
            checkEntityExists={(name) => checkEntityExists(name, id)} 
            initialName={initialName}
            saveButton={true}
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

export default EditEntity;
