import { useNavigate } from "react-router";

const Username = ({ user, className = "", network = "" }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`d-flex align-items-center hover mb-0 ${className}`}
      onClick={() => navigate(`/${user?.username}`, { state: { user: user } })}
    >
      <img
        src={`http://localhost:3000/static/${
          user?.profilePic || "default-profile-pic.jpg"
        }`}
        className="rounded-circle me-2"
        style={{ height: "30px", widht: "30px" }}
      />
      <span className="text-white text-truncate">
        {user?.username}
        {network ? ` / ${network}` : ""}
      </span>
    </div>
  );
};

export default Username;
