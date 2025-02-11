import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatMessageInput from "./ChatMessageInput";
import socket from "../../socket";
import Username from "../Username";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";

const Chat = ({ chat, onHide, style }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const addMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat-message", addMessage);
    socket.emit("register", user.id);

    return () => {
      socket.off("chat-message", addMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const response = await api.get(`chats/${chat.chatId}`);
      console.log("messages", response.data);
      return response.data;
    };

    if (chat?.chatId) {
      getMessages().then(setMessages);
    }
  }, [chat]);

  return (
    <>
      <div className="d-flex align-items-center border-bottom pb-2">
        <Username className="me-auto" user={chat?.members?.[0]} />
        <span className={`d-flex flex-column align-items-center p-2`}>
          <span className="material-symbols-outlined hover" onClick={onHide}>
            arrow_back
          </span>
        </span>
      </div>
      <div className="d-flex flex-column pt-2" style={style}>
        <div className="mb-auto" style={{ overflowY: "auto" }}>
          {messages?.map((message, key) => (
            <ChatMessage className="mb-1" key={key} message={message} />
          ))}
        </div>
        <ChatMessageInput
          chat={chat}
          chatId={messages[0]?.chatId}
          receivers={chat?.members}
          sender={user}
          className={"sticky-bottom mt-auto"}
          setMessages={setMessages}
          style={{ marginTop: "auto" }}
        />
      </div>
    </>
  );
};

export default Chat;
