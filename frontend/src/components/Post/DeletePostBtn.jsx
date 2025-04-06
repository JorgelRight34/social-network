import useDeletePost from "../../hooks/useDeletePost";
import RoundedPill from "../RoundedPill";

const DeletePostBtn = ({ post, postRef }) => {
  const { deletePost, error } = useDeletePost();

  const handleOnClick = async () => {
    if (!confirm("Are you sure you wanna delete this post?")) return;
    await deletePost(post.id);
    if (error) {
      alert("Error deleting post");
      return;
    }
    // Hide the post after deletion
    postRef.current.style.visibility = "hidden";
  };

  return (
    <RoundedPill className={"border bg-secondary"} onClick={handleOnClick}>
      <span>Delete</span>
    </RoundedPill>
  );
};

export default DeletePostBtn;
