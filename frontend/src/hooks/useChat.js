import { useEffect, useState } from "react";
import socket from "../socket";
import { useSelector } from "react-redux";
import api from "../api";

const useChat = (chat) => {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chats);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const getMessages = async () => {
    const response = await api.get(`chats/${chat.chatId}`);
    return response.data;
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (currentChat?.chatId === currentChat?.chatId) {
      socket.on("chat-message", (msg) => {
        addMessage(msg);
      });
      socket.emit("register", user.id);
    }

    return () => {
      socket.off("chat-message", addMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setMessages([]); // Clear to avoid showing foreign messages

    if (chat?.chatId) {
      getMessages().then(setMessages);
    }
  }, [chat]);

  return { messages };
};

export default useChat;
