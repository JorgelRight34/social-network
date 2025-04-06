import api from "../api";

export const encodeFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove the Base64 prefix
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const getPost = async (id) => {
  let response;

  try {
    response = await api.get(`/posts/${id}`);
  } catch (err) {
    console.log(err);
    return;
  }

  return response.data;
};
