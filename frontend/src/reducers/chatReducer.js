import {
  CLOSE_CHAT,
  SET_CHAT_ID,
  SET_CHATS,
  START_CHAT,
} from "../actions/types";

const chatReducer = (state = { currentChat: null, chats: [] }, action) => {
  switch (action.type) {
    case CLOSE_CHAT:
      return { ...state, currentChat: null };
    case SET_CHATS:
      return { ...state, chats: [...action.payload] };
    case START_CHAT:
      if (action.payload.members?.length === 1) {
        const chat = state.chats.filter((chat) => {
          const members = chat.members;
          if (members.length > 1) {
            return false;
          }
          console.log("members", members);
          return members.filter((member) => member.username)?.[0]
            ? true
            : false;
        })?.[0];

        if (chat) {
          return { ...state, currentChat: chat };
        }
      }

      return { ...state, currentChat: action.payload };
    case SET_CHAT_ID:
      return {
        currentChat: { ...state.currentChat, chatId: action.payload },
        chats: [
          ...state.chats.map((chat) => {
            if (!chat.id) {
              chat.id = action.payload;
            }
            return chat;
          }),
        ],
      };
    default:
      return state;
  }
};

export default chatReducer;
