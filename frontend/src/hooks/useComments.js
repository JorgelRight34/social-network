import { useState } from "react";
import api from "../api";

const useComments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handlePostComment = async (postId) => {
    let response;

    try {
      response = await api.post("comments/", {
        content: comment,
        postId,
      });
    } catch {
      return;
    }

    setComments((prev) => [response.data, ...prev]);
    setComment("");
  };

  const getComments = async (postId) => {
    let response;
    try {
      response = await api.get(`comments/${postId}`);
    } catch (err) {
      console.log(err);
      return;
    }
    setComments(response.data);
  };

  return { comment, comments, setComment, getComments, handlePostComment };
};

export default useComments;
