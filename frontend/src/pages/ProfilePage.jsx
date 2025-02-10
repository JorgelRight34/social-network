import { useLocation, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { getUser } from "../lib/utility-functions";
import { useEffect, useState } from "react";
import api from "../api";
import RepresentationCard from "../components/RepresentationCard";
import RoundedPill from "../components/RoundedPill";

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
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-2"></div>
        <div className="col-lg-7">
          <RepresentationCard
            className="rounded-top-3"
            rep={profileUser}
            title={profileUser?.username}
          />
          <div className="bg-primary p-3 rounded-botom-3">
            <div className="d-flex p-3">
              <RoundedPill className="border bg-secondary me-3">
                Chat
              </RoundedPill>
              <RoundedPill className="border bg-secondary me-3">
                Posts
              </RoundedPill>
            </div>
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

export default ProfilePage;
