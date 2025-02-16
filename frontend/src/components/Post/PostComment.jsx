import { formatDistanceToNow } from "date-fns";
import Username from "../Username";

const PostComment = ({ className, comment }) => {
  return (
    <div className={`comment border rounded-3 p-3 ${className}`}>
      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <Username className="me-2" user={comment.User} />
        <span className="text-muted">
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
      {/* Body */}
      <div>{comment.content}</div>
    </div>
  );
};

export default PostComment;
