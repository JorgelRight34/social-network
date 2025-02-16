import RoundedPill from "../RoundedPill";
import { useSelector } from "react-redux";
import DeletePostBtn from "./DeletePostBtn";
import CustomCarousel from "../CustomCarousel";
import { useNavigate } from "react-router";
import { useRef } from "react";
import Username from "../Username";
import LikeBtn from "./LikeBtn";
import { formatDistanceToNow } from "date-fns";

const Post = ({ className = "", post, showNetwork = false }) => {
  const navigate = useNavigate();
  const postRef = useRef();
  const { user } = useSelector((state) => state.user);

  const showChatDialog = () => {
    setIsChatShowing(true);
  };

  return (
    <>
      <div
        className={`post bg-primary border rounded-3 shadow-sm ${className}`}
        ref={postRef}
      >
        <div className="p-3">
          <div className="d-flex align-items-center mb-2">
            <Username
              className="me-3"
              network={showNetwork ? post.Network?.name || "" : ""}
              user={post.User}
            />
            <span className="me-auto text-muted mb-0">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
            {post.User?.username == user?.username ? (
              <DeletePostBtn post={post} postRef={postRef} />
            ) : (
              ""
            )}
          </div>
          <h4 className="mb-0">{post.title}</h4>
        </div>
        <CustomCarousel media={post.media} />
        <div>
          <div className="p-3">{post.body}</div>
          <div className="d-flex align-items-center p-3">
            <LikeBtn post={post} />
            <RoundedPill
              className="bg-secondary border"
              onClick={() =>
                navigate(
                  `/post/${post.Network.name}/${post.User.username}/${post.id}`,
                  {
                    state: { post: post },
                  }
                )
              }
            >
              <span className="material-symbols-outlined">chat</span>
              {console.log(post.Comments)}
              &nbsp; {post.Comments?.length}
            </RoundedPill>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
