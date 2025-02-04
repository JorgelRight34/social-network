import { useLocation, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { getUser } from "../lib/utility-functions";

const ProfilePage = ({}) => {
  const location = useLocation();
  const { username } = useParams();
  const profileUser = location.state?.profileUser || getUser(username);

  return (
    <div>
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-2"></div>
        <div className="col-lg-7">
          <div className="bg-primary p-3 rounded-3">
            {profileUser.username}
            {console.log(profileUser)}
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
