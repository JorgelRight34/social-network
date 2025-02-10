import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Post from "../components/Post/Post";
import CreateNetwork from "../components/Network/CreateNetwork";
import NetworksWidget from "../components/Network/NetworksWidget";
import { mobileWidth } from "../lib/constants";
import NavbarSM from "../components/NavbarSM";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      let response;
      try {
        response = await api.get("posts/");
      } catch (err) {
        console.log(err);
        return;
      }

      setPosts(response.data);
    };

    getPosts();
  }, []);

  return (
    <div className="position-relative">
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-0 p-lg-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 p-0">
          <div className="rounded-3 p-0 px-lg-3">
            {posts.map((post) => (
              <Post
                key={post.id}
                className="mb-3"
                post={post}
                showNetwork={true}
              />
            ))}
          </div>
        </div>
        <div className="col-lg-3 d-none d-lg-block">
          <div className="bg-primary border p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center">
              <span className="me-auto">Networks</span>
              <CreateNetwork className="bg-secondary" />
            </div>
            <NetworksWidget />
          </div>
        </div>
      </div>
      {window.innerWidth < mobileWidth ? <NavbarSM /> : ""}
    </div>
  );
};

export default Index;
