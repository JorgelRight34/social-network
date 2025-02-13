import api from "../api";
import { LOGIN, LOGOUT } from "./types"


export const setUser = (payload) => {
    return {
        type: LOGIN,
        payload: payload
    }
}

export const loginUser = () => async (dispatch) => {
    let response;
    try {
        response = await api.get('users/');
    } catch (err) {
        console.log(err);
        return
    }

    dispatch(setUser(response.data))
}

export const logout = () => async (dispatch) => {
    localStorage.clear();

    dispatch({
        type: LOGOUT,
    });
}