import { useEffect } from "react";
import PostComment from "./PostComment";
import Username from "../Username";
import { useSelector } from "react-redux";
import useComments from "../../hooks/useComments";

const PostChat = ({ post }) => {
  const { comment, comments, setComment, getComments, handlePostComment } =
    useComments();
  const { user } = useSelector((state) => state.user);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await handlePostComment(post.id);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user ? (
        <form
          className="comment border rounded-3 p-3 mb-3"
          method="POST"
          onSubmit={(e) => handleOnSubmit(e)}
        >
          {/* Header */}
          <div className="mb-3">
            <Username user={user} />
          </div>
          {/* Body */}
          <div>
            <textarea
              className="form-control bg-secondary mb-2"
              name="content"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <button type="submit" className="btn btn-accent">
              Submit
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
      <div>
        {comments.map((comment) => (
          <PostComment className="mb-3" key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default PostChat;
