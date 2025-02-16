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

const ProfilePage = ({}) => {
  const location = useLocation();
  const params = useParams();
  const [profileUser, setProfileUser] = useState(
    location.state?.profileUser || null
  );
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await api.get(`posts/?user=${params.username}`);
      setPosts((prev) => [...response.data, ...prev]);
    };

    fetchUserPosts().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getUser(params.username)
      .then(setProfileUser)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {window.innerWidth > mobileWidth ? <Navbar /> : ""}
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-2"></div>
        <div className="col-lg-7 p-0 px-lg-5">
          <RepresentationCard
            className="rounded-top-3"
            rep={profileUser}
            title={profileUser?.username}
          />
          <div className="bg-primary p-3 rounded-botom-3 mb-3 mb-lg-0">
            <div className="d-flex p-3">
              <StartChatBtn user={profileUser} className="me-3" />
              <RoundedPill className="border bg-secondary me-3">
                Posts
              </RoundedPill>
            </div>
          </div>
          {posts.map((post, key) => (
            <Post
              key={`${post.id}-${key}`}
              className="mb-3"
              post={post}
              showNetwork={true}
            />
          ))}
        </div>
        <div className="d-none d-lg-block col-lg-3">
          <NetworksWidget />
        </div>
      </div>
      {window.innerWidth <= mobileWidth ? <NavbarSM /> : ""}
    </div>
  );
};

export default ProfilePage;
