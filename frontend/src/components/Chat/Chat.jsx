import ChatMessage from "./ChatMessage";
import ChatMessageInput from "./ChatMessageInput";
import Username from "../Username";
import useChat from "../../hooks/useChat";

const Chat = ({ chat, onHide, style }) => {
  const { messages } = useChat(chat);

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
      <div className="chat d-flex flex-column pt-2" style={style}>
        <div className="mb-auto px-3" style={{ overflowY: "auto" }}>
          {messages?.map((message, key) => (
            <ChatMessage
              className="bg-secondary mb-3 shadow-sm"
              key={key}
              message={message}
            />
          ))}
        </div>
        <div className="pt-3">
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
      </div>
    </>
  );
};

export default Chat;
