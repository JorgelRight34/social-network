import { useState } from "react";
import api from "../../api";
import RoundedPill from "../RoundedPill";
import { useSelector } from "react-redux";

const LikeBtn = ({ post }) => {
  const [likes, setLikes] = useState(post?.Likes?.length || 0);
  const [hasLiked, setHasLiked] = useState(post?.hasLiked);

  const handleOnClick = async () => {
    const response = await api.post(`/posts/${hasLiked ? "unlike" : "like"}`, {
      postId: post.id,
    });
  };

  return (
    <RoundedPill
      className={"bg-secondary border me-3"}
      onClick={() => {
        setLikes((prev) => prev + (hasLiked ? -1 : 1));
        setHasLiked((prev) => !prev);
        handleOnClick();
      }}
    >
      <span className="material-symbols-outlined">mood</span>
      &nbsp; {likes}
    </RoundedPill>
  );
};

export default LikeBtn;
