export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "sports_uploads");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djrfohide/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; 
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
