import { useEffect, useState } from "react";
import CreateBtn from "./CreateBtn";
import Post from "./Post";
import api from "../../api";
import CustomCarousel from "../CustomCarousel";
import Username from "../Username";

const RecentPostsWidget = ({}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      let response;
      try {
        response = await api.get(`posts/?page=1?limit=4`);
      } catch (err) {
        console.log(err);
        return;
      }

      setPosts((prev) => [...prev, ...response.data]);
    };

    if (posts.length === 0) {
      getPosts();
    }
  }, []);

  return (
    <>
      <div className="bg-primary border p-3 rounded-3 shadow-sm">
        <div className="d-flex align-items-center">
          <span className="me-auto">Recent Posts</span>
          <CreateBtn className="bg-secondary" />
        </div>
        {posts.map((post) => (
          <div
            className={`row bg-secondary hover border rounded-3 mx-0 mt-3 p-2`}
          >
            <div className="">
              <div className="d-flex align-items-center">
                <Username
                  className="me-auto"
                  network={post.Network?.name}
                  user={post.User}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center p-2">
              {post.media ? (
                <CustomCarousel size={3} media={post.media} />
              ) : (
                post.content.slice(25)
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentPostsWidget;
