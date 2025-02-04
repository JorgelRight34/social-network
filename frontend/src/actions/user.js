import api from "../api";
import { LOGIN } from "./types"


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
    console.log("dispatching", response.data)
    dispatch(setUser(response.data))
}