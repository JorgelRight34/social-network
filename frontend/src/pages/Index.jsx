import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Post from "../components/Post/Post";
import CreateNetwork from "../components/Network/CreateNetwork";
import NetworksWidget from "../components/Network/NetworksWidget";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      let response;
      try {
        response = await api.get("posts/posts");
      } catch (err) {
        console.log(err);
        return;
      }

      setPosts(response.data);
    };

    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="rounded-3">
            {posts.map((post) => (
              <Post key={post._id} className="mb-3" post={post} />
            ))}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="bg-primary border p-3 rounded-3 shadow-sm">
            Networks
            <CreateNetwork />
            <NetworksWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
