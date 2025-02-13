import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Network = ({ network, className = "" }) => {
  const navigate = useNavigate();
  const imgSize = "50px";

  return (
    <Link
      to={`/network/${network.name}`}
      onClick={(e) => {
        // Reload the page to force navigation even if the user is already on the route
        e.preventDefault();
        window.location.href = `/network/${network.name}`;
      }}
      className={`row bg-secondary hover border text-decoration-none rounded-3 mx-0 ${className}`}
    >
      <div className="col-lg-3 d-flex align-items-center justify-content-center">
        <img
          src={`http://localhost:3000/static/${
            network.profilePic || "default-profile-pic.jpg"
          }`}
          className="me-2 rounded-circle"
          style={{
            height: imgSize,
            width: imgSize, // Fixed typo here (was "widht")
            maxWidth: imgSize,
            maxHeight: imgSize,
            objectFit: "cover",
          }}
        />
      </div>
      <div className="col-lg-9 p-2">
        <div className="mb-2">
          <h6>{network.name}</h6>
        </div>
        <p>{network.description}</p>
      </div>
    </Link>
  );
};

export default Network;
