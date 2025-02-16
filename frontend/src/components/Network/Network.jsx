import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Network = ({ network, className = "" }) => {
  const navigate = useNavigate();
  const imgSize = "55px";

  return (
    <Link
      to={`/network/${network.name}`}
      onClick={(e) => {
        // Reload the page to force navigation even if the user is already on the route
        e.preventDefault();
        window.location.href = `/network/${network.name}`;
      }}
      className={`bg-secondary hover text-decoration-none rounded-3 mx-0`}
    >
      <div
        className={`p-2 d-flex justify-content-center rounded-top border mt-3 ${className}`}
        style={{
          backgroundImage: `url(http://localhost:3000/static/${network.wallpaper})`,
          objectFit: "cover",
        }}
      >
        <img
          src={`http://localhost:3000/static/${
            network.profilePic || "default-profile-pic.jpg"
          }`}
          className="me-2 rounded-circle shadow-lg"
          style={{
            height: imgSize,
            width: imgSize, // Fixed typo here (was "widht")
            maxWidth: imgSize,
            maxHeight: imgSize,
            objectFit: "cover",
          }}
        />
      </div>
      <div className="p-2 border rounded-bottom">
        <div className="mb-2">
          <h6>{network.name}</h6>
        </div>
        <p className="text-truncate mb-2" title={network.description}>
          {network.description}
        </p>
        <span className="d-flex justify-content-end text-muted">
          {+network.memberCount + +network.adminCount} members
        </span>
      </div>
    </Link>
  );
};

export default Network;
