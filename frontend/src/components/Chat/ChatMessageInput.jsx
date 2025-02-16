import { useState } from "react";
import socket from "../../socket";
import { useSelector } from "react-redux";

const ChatMessageInput = ({
  chat,
  chatId = null,
  receivers,
  className,
  style,
  setMessages,
}) => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);

  const handleOnSubmit = (event) => {
    event.preventDefault();
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

  const handleOnChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleOnSubmit} className={`${className}`} style={style}>
      <input
        className="form-control rounded-pill"
        name="message"
        placeholder="Write a message"
        value={message}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default ChatMessageInput;
