import { useLocation, useParams } from "react-router";
import CustomCarousel from "../components/CustomCarousel";
import Navbar from "../components/Navbar";
import PostChat from "../components/PostChat";
import Username from "../components/Username";
import { useEffect } from "react";
import { getPost } from "../lib/utility-functions";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/user";

const PostPage = ({}) => {
  const location = useLocation();
  const params = useParams();
  const { post } = location.state || getPost(params.post);
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-2"></div>
        <div className="col-lg-7">
          <div className="bg-primary p-3 rounded-3">
            {post ? (
              <>
                <div className="border rounded-3 shadow-sm mb-4">
                  <div className="d-flex align-items-center mb-3 p-3">
                    <Username user={post.user} />
                    <h6 className="ms-auto mb-0">{post.title}</h6>
                  </div>
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
                <div>
                  <PostChat post={post} />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="bg-primary border p-3 rounded-3 shadow-sm">
            Groups
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
