import { LOGIN, LOGOUT } from "./types";

export const setUser = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  dispatch({
    type: LOGOUT,
  });
};
