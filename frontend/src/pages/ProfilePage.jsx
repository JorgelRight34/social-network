import { useLocation, useParams } from "react-router";
import RepresentationCard from "../components/RepresentationCard";
import RoundedPill from "../components/RoundedPill";
import StartChatBtn from "../components/Chat/StartChatBtn";
import Post from "../components/Post/Post";
import usePage from "../hooks/usePage";
import Layout from "../components/Layout";
import useProfile from "../hooks/useProfile";
import usePosts from "../hooks/usePosts";
import { useEffect } from "react";

const ProfilePage = () => {
  const location = useLocation();
  const params = useParams();
  const { profile, getProfile } = useProfile(location.state?.profile || null);
  const { page, stopFetching } = usePage();
  const { posts, getPosts } = usePosts();

  useEffect(() => {
    if (!stopFetching) {
      getPosts(params.username).catch((err) => console.log(err));
    }
  }, [page]);

  useEffect(() => {
    getProfile(params.username).catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <RepresentationCard
        className="rounded-top-3"
        rep={profile}
        title={profile?.username}
        noWallpaper={true}
      />
      <div className="d-flex mt-3 mb-3">
        <StartChatBtn user={profile} className="me-3" />
        <RoundedPill className="border bg-secondary me-3">Posts</RoundedPill>
      </div>
      {posts.map((post, key) => (
        <Post
          key={`${post.id}-${key}`}
          className="mb-3"
          post={post}
          showNetwork={true}
        />
      ))}
    </Layout>
  );
};

export default ProfilePage;
