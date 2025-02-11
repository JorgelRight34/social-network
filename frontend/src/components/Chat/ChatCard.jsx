const ChatCard = ({ chat, onClick, className = "" }) => {
  const imgSize = "50px";

  return (
    <div
      className={`row bg-primary hover rounded-3 border mx-0 ${className}`}
      onClick={onClick}
    >
      <div className="d-flex justify-content-center align-items-center col-lg-3">
        <img
          src={`http://localhost:3000/static/${
            chat?.members?.[0]?.profilePic || "default-profile-pic.jpg"
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
      <div className="col p-2">
        <h6>{chat?.members?.[0]?.username}</h6>
        <p>Lorem, ipsum dolor sit amet.</p>
      </div>
    </div>
  );
};

export default ChatCard;
