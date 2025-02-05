import { useLocation, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { getUser } from "../lib/utility-functions";
import UserCard from "../components/UserCard";
import { useEffect, useState } from "react";
import api from "../api";

const ProfilePage = ({}) => {
  const location = useLocation();
  const { username } = useParams();
  const profileUser = location.state?.profileUser || getUser(username);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(profileUser);
    const fetchUserPosts = async () => {
      const response = await api.get(`posts/?user=${profileUser.username}`);
      setPosts((prev) => [...response.data, ...prev]);
    };

    fetchUserPosts().catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-2"></div>
        <div className="col-lg-7">
          <UserCard className="rounded-top-3" user={profileUser} />
          <div className="bg-primary p-3 rounded-botom-3"></div>
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

export default ProfilePage;
