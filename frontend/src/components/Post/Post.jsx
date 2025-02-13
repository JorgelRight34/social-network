import RoundedPill from "../RoundedPill";
import { useSelector } from "react-redux";
import DeletePostBtn from "./DeletePostBtn";
import CustomCarousel from "../CustomCarousel";
import { useNavigate } from "react-router";
import { useRef } from "react";
import Username from "../Username";

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
              className="me-auto"
              network={showNetwork ? post.Network?.name || "" : ""}
              user={post.User}
            />
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
          <div className="p-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
            ducimus ad, molestiae laborum velit quam nulla alias harum corrupti
            voluptas, cupiditate reprehenderit deleniti accusamus quas aliquam
            blanditiis, placeat vitae aliquid.
          </div>
          <div className="d-flex align-items-center p-3">
            <RoundedPill className={"bg-secondary border me-3"}>
              <span className="material-symbols-outlined">mood</span>
              &nbsp; 0
            </RoundedPill>
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
              &nbsp; 0
            </RoundedPill>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
