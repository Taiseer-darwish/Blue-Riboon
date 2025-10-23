// src/components/Forms/EntityForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaSpinner } from "react-icons/fa";


const makeSchema = (checkEntityExists, isEdit = false, initialName = "") =>
  yup.object().shape({
    entityName: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .test(
        "unique-name",
        "This name already exists",
        async (value) => {
          if (!value) return true;
          if (isEdit && value === initialName) return true;
          const exists = await checkEntityExists(value);
          return !exists;
        }
      ),
    entityImage: yup.mixed().test("file-selected", "Image is required", (value) => {
      if (isEdit) return true; 
      return value && value[0] instanceof File;
    }),
  });

function EntityForm({
  entityType,
  onSubmit,
  handleImageChange,
  isLoading,
  checkEntityExists,
  initialName = "",
  saveButton = false,
}) {
  const isEdit = Boolean(initialName);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(makeSchema(checkEntityExists, isEdit, initialName)),
    defaultValues: { entityName: initialName || "" },
  });

  useEffect(() => {
    setValue("entityName", initialName || "");
  }, [initialName, setValue]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("entityImage", e.target.files); 
      handleImageChange(e);
    }
  };

  return (
    <form className="w-1/2 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={`${entityType}Name`} className="text-white text-lg mb-2 block">
          {entityType} Name
        </label>
        <input
          id={`${entityType}Name`}
          type="text"
          placeholder={`Enter ${entityType.toLowerCase()} name`}
          {...register("entityName")}
          className={`bg-transparent rounded-2xl p-3 w-full shadow-[0_0_5px_#ff0000] text-white placeholder-gray-400 ${
            errors.entityName ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.entityName && <p className="text-red-500 text-sm mt-1">{errors.entityName.message}</p>}
      </div>

      <div>
        <label htmlFor={`${entityType}Image`} className="text-white text-lg mb-2 block">
          {entityType} Image
        </label>
        <input
          id={`${entityType}Image`}
          name={`${entityType}Image`}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className={`bg-transparent rounded-2xl p-3 w-full shadow-[0_0_5px_#ff0000] text-white ${
            errors.entityImage ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.entityImage && <p className="text-red-500 text-sm mt-1">{errors.entityImage.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-[#1a1212] to-[#520202d4] text-white font-bold py-2 px-6 rounded-xl shadow-[0_0_5px_#fff] cursor-pointer hover:shadow-[0_0_10px_#ff0000] transition-all duration-300 mt-4 relative"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
            Uploading...
          </div>
        ) : (
          saveButton ? "Save" : `Add ${entityType}`
        )}
      </button>
    </form>
  );
}

export default EntityForm;
