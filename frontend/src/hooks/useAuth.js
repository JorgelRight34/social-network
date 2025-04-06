import { useState } from "react";
import api from "../api";
import useFormData from "./useFormData";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../actions/user";

const useAuth = () => {
  const [formData, handleOnBlur] = useFormData();
  const [error, setError] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = async () => {
    const response = await api
      .post(
        "users/login",
        {
          username: formData.username.replace(" ", ""),
          password: formData.password.replace(" ", ""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(() => {
        setError(true);
        return false;
      });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return true;
  };

  const loadUser = () => async () => {
    let response;
    try {
      response = await api.get("users/");
    } catch {
      return;
    }
    dispatch(setUser(response.data));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return { login, loadUser, handleOnBlur, handleLogout, error, user };
};

export default useAuth;
