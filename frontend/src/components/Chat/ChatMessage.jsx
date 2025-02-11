import Username from "../Username";

const ChatMessage = ({ className = "", message }) => {
  return (
    <div className={`comment border rounded-3 p-3 ${className}`}>
      {/* Header */}
      <div className="mb-3">
        <Username user={message.user} />
      </div>
      {/* Body */}
      <div>{message.content}</div>
    </div>
  );
};

export default ChatMessage;
