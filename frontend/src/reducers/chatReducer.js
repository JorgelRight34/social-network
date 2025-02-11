import {SET_CHAT_ID, SET_CHATS, START_CHAT } from "../actions/types";

const chatReducer = (state={currentChat: null, chats: []}, action) => {
    switch (action.type) {
        case SET_CHATS:
            return {...state, chats: [...action.payload]}
        case START_CHAT:
            return {currentChat: action.payload, chats: [...state.chats]};
        case SET_CHAT_ID:
            return {
                currentChat: {...state.currentChat, chatId: action.payload}, 
                chats: [...state.chats.map(chat => {
                    if (!chat.id) {
                        chat.id = action.payload;
                    }
                    return chat
                })]
            }
        default:
            return state
    }
}

export default chatReducer