import { CLOSE_CHAT, SET_CHATS, SET_CHAT_ID, START_CHAT } from "./types";

export const setChats = (chats) => {
  return {
    type: SET_CHATS,
    payload: chats,
  };
};

export const startChat = (chat) => {
  return {
    type: START_CHAT,
    payload: chat,
  };
};

export const closeChat = () => {
  return {
    type: CLOSE_CHAT,
  };
};

export const setChatId = (id) => {
  return {
    type: SET_CHAT_ID,
    payload: id,
  };
};
