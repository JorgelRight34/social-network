import { useState } from "react";
import api from "../api";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const getPosts = async (page = 1, limit, username = "") => {
    let response;
    try {
      response = await api.get(
        `posts/?page=${page}?limit=${limit}&${
          username ? `username=${username}` : ""
        }`
      );
    } catch {
      setError(true);
      return;
    }

    setPosts((prev) => [...prev, ...response.data]);
    return response.data.length;
  };

  return { posts, error, getPosts };
};

export default usePosts;
