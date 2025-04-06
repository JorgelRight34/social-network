import { useState } from "react";
import api from "../api";

const useProfile = (defaultProfile) => {
  const [profile, setProfile] = useState(defaultProfile || null);

  const getProfile = async (username) => {
    let response;

    try {
      response = await api.get(`/users/profile/${username}`);
    } catch (err) {
      console.log(err);
      return;
    }

    setProfile(response.data);
  };

  return { profile, getProfile };
};

export default useProfile;
