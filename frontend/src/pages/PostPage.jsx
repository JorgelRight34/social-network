import { useLocation, useParams } from "react-router";
import CustomCarousel from "../components/CustomCarousel";
import Navbar from "../components/Navbar";
import PostChat from "../components/Post/PostChat";
import Username from "../components/Username";
import { useEffect } from "react";
import { getPost } from "../lib/utility-functions";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/user";
import { mobileWidth } from "../lib/constants";
import NavbarSM from "../components/NavbarSM";
import { formatDistanceToNow } from "date-fns";

const PostPage = ({}) => {
  const location = useLocation();
  const params = useParams();
  const { post } = location.state || getPost(params.post);

  return (
    <div>
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-2"></div>
        <div className="col-lg-7 p-0">
          <div className="bg-primary p-0 p-lg-3 rounded-3 mb-5 mb-lg-0">
            {post ? (
              <>
                <div className="post border border-sm-bottom rounded-3 shadow-sm mb-4">
                  <div className="d-flex align-items-center p-3">
                    <Username className="me-3" user={post.User} />
                    <span className="me-auto text-muted mb-0">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <h6 className="ms-auto mb-3 px-3">{post.title}</h6>
                  <div className="mb-3">
                    <CustomCarousel
                      className="rounded"
                      media={post?.media || []}
                      size={13}
                    />
                  </div>
                  <div className="mb-3 p-3">
                    <span>{post.body}</span>
                  </div>
                </div>
                <span>
                  {post.Comments.length} Comment
                  {post.Comments.length > 1 ? "s" : ""}
                </span>
                <div className="border-top pt-3 mt-3">
                  <PostChat post={post} />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-3 d-none d-lg-block"></div>
      </div>
      {window.innerWidth < mobileWidth ? <NavbarSM /> : ""}
    </div>
  );
};

export default PostPage;
