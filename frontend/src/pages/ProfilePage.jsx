import { useLocation, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { getUser } from "../lib/utility-functions";
import { useEffect, useState } from "react";
import api from "../api";
import RepresentationCard from "../components/RepresentationCard";
import RoundedPill from "../components/RoundedPill";
import StartChatBtn from "../components/Chat/StartChatBtn";
import RecentPostsWidget from "../components/Post/RecentPostsWidget";
import NetworksWidget from "../components/Network/NetworksWidget";
import NavbarSM from "../components/NavbarSM";
import { mobileWidth } from "../lib/constants";
import Post from "../components/Post/Post";
import usePage from "../hooks/usePage";
import Layout from "../components/Layout";

const ProfilePage = ({}) => {
  const location = useLocation();
  const params = useParams();
  const [profileUser, setProfileUser] = useState(
    location.state?.profileUser || null
  );
  const [page, , stopFecthingMore, setStopFetchingMore] = usePage();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await api.get(
        `posts/?user=${params.username}&page=${page}`
      );
      setPosts((prev) => [...response.data, ...prev]);
    };

    if (!stopFecthingMore) {
      fetchUserPosts().catch((err) => console.log(err));
    }
  }, [page]);

  useEffect(() => {
    getUser(params.username)
      .then(setProfileUser)
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <RepresentationCard
        className="rounded-top-3"
        rep={profileUser}
        title={profileUser?.username}
        noWallpaper={true}
      />
      <div className="d-flex mt-3 mb-3">
        <StartChatBtn user={profileUser} className="me-3" />
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
