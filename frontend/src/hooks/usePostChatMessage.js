import { useState } from "react";
import { useSelector } from "react-redux";
import socket from "../socket";

const usePostChatMessage = (chat) => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);

  const onSubmit = (receivers, chatId) => {
    const data = {
      senderUserId: user.id,
      receiverUserId: receivers?.[0].id,
      senderId: chat?.senderId,
      receiverId: receivers?.[0].userId,
      content: message,
      chatId: chatId,
    };
    socket.emit("send-chat-message", data);
    setMessage("");
  };

  return { message, onSubmit, setMessage };
};

export default usePostChatMessage;
