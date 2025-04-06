import { useRef, useState } from "react";
import api from "../api";

const useCreatePost = () => {
  const formRef = useRef();
  const [files, setFiles] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);
    let response;

    Object.keys(files).forEach((key) => data.append("files", files[key]));

    try {
      response = await api.post("posts/", data);
    } catch {
      return;
    }

    formRef.current.reset(); // Reset form
    return response.data;
  };

  return { onSubmit, formRef, files, setFiles };
};

export default useCreatePost;
