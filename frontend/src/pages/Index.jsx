import { useEffect } from "react";
import Post from "../components/Post/Post";
import Layout from "../components/Layout";
import usePosts from "../hooks/usePosts";
import usePage from "../hooks/usePage";

const Index = () => {
  const { posts, getPosts } = usePosts();
  const { page, stopFetching, setStopFetching } = usePage();

  useEffect(() => {
    if (!stopFetching) {
      // If hasn't reached a page with no new posts then try
      // to fetch again new posts
      const responseLength = getPosts();
      if (responseLength == 0) {
        // If no new posts then stop fetching
        setStopFetching(true);
      }
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
