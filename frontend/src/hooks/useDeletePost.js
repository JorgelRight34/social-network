import api from "../api";
import { useState } from "react";

const useDeletePost = () => {
  const [error, setError] = useState(false);

  const deletePost = async (postId) => {
    try {
      await api.delete(`posts/${postId}`);
    } catch {
      setError(true);
      return;
    }
  };

  return { deletePost, error };
};

export default useDeletePost;
