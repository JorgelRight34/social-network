import api from "../../api";
import RoundedPill from "../RoundedPill";

const DeletePostBtn = ({ post, postRef }) => {
  const handleOnClick = async () => {
    let response;

    if (!confirm("Are you sure you wanna delete this post?")) {
      return;
    }

    try {
      response = await api.delete(`posts/${post.id}`);
    } catch (err) {
      console.log(err);
      return;
    }

    postRef.current.style.visibility = "hidden";
  };

  return (
    <RoundedPill className={"border bg-secondary"} onClick={handleOnClick}>
      <span>Delete</span>
    </RoundedPill>
  );
};

export default DeletePostBtn;
