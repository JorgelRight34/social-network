import { useNavigate } from "react-router";

const Network = ({ network, className = "" }) => {
  const navigate = useNavigate();
  const imgSize = "50px";

  return (
    <div
      className={`row hover border rounded-3 mx-0 ${className}`}
      onClick={() => navigate(`/network/${network.name}`)}
    >
      <div className="col-lg-3 d-flex align-items-center justify-content-center">
        <img
          src={`http://localhost:3000/static/${
            network.profilePic || "default-profile-pic.jpg"
          }`}
          className="me-2 rounded-circle"
          style={{
            height: imgSize,
            widht: imgSize,
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
    </div>
  );
};

export default Network;
