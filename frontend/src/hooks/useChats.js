import { useDispatch } from "react-redux";
import api from "../api";
import { setChats } from "../actions/chat";

const useChats = () => {
  const dispatch = useDispatch();

  const getChats = async () => {
    const response = await api.get("chats/");
    dispatch(setChats(response.data)); // Set global state

    return response.data;
  };

  return { getChats };
};

export default useChats;
