import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import chatReducer from "./reducers/chatReducer"

const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatReducer
    }
})

export default store