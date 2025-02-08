import { useEffect, useState } from "react";
import api from "../../api";
import useFormData from "../../hooks/useFormData";
import PostComment from "./PostComment";
import Username from "../Username";
import { useSelector } from "react-redux";

const PostChat = ({ post }) => {
  const [formData, setFormData] = useFormData();
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.user);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let response;

    try {
      response = await api.post("comments/", {
        content: formData.content,
        postId: post.id,
      });
    } catch (err) {
      console.log(error);
      return;
    }

    setComments((prev) => [response.data, ...prev]);
    setFormData({});
    event.target.reset();
  };

  useEffect(() => {
    const getComments = async () => {
      let response;
      try {
        response = await api.get(`comments/${post.id}`);
      } catch (err) {
        console.log(err);
        return;
      }
      setComments(response.data);
    };

    getComments();
  }, []);

  return (
    <>
      {user ? (
        <form
          className="border rounded-3 p-3 mb-3"
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
              onBlur={setFormData()}
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
          <PostComment className="mb-3" key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default PostChat;
