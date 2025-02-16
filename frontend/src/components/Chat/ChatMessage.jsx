import Username from "../Username";
import { formatDistanceToNow } from "date-fns";

const ChatMessage = ({ className = "", message }) => {
  return (
    <div className={`comment border rounded-3 p-3 ${className}`}>
      {/* Header */}
      <div className="mb-3">
        <Username user={message.user} />
      </div>
      {/* Body */}
      <div>
        {message.content}
        <div className="d-flex justify-content-end text-muted">
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
