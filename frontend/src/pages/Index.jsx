import { useEffect, useState } from "react";
import api from "../api";
import Post from "../components/Post/Post";
import usePage from "../hooks/usePage";
import Layout from "../components/Layout";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [page, , stopFetching, setStopFetching] = usePage();

  useEffect(() => {
    const getPosts = async () => {
      let response;
      try {
        response = await api.get(`posts/?page=${page}`);
      } catch (err) {
        console.log(err);
        return;
      }

      if (response.data?.length === 0) {
        setStopFetching(true);
      }

      // Append posts
      setPosts((prev) => [...prev, ...response.data]);
    };

    if (!stopFetching) {
      // If hasn't reached a page with no new posts then try
      // to fetch again new posts
      getPosts();
    }
  }, [page]);

  return (
    <Layout>
      <div className="rounded-3 p-0">
        {posts.map((post, key) => (
          <Post
            key={`${post.id}-${key}`}
            className="mb-3"
            post={post}
            showNetwork={true}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
