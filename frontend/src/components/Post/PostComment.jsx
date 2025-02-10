import Username from "../Username";

const PostComment = ({ className, comment }) => {
  return (
    <div className={`comment border rounded-3 p-3 ${className}`}>
      {/* Header */}
      <div className="mb-3">
        <Username user={comment.User} />
      </div>
      {/* Body */}
      <div>{comment.content}</div>
    </div>
  );
};

export default PostComment;
