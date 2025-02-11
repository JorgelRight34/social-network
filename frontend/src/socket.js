import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URI, {
    transports: ["websocket"],
    autoConnect: false
})

export default socket