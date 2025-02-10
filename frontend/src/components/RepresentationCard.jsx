const RepresentationCard = ({ rep, size = 70, className = "", title = "" }) => {
  const imgSize = `${size}px`;

  return (
    <>
      <div
        className={`position-relative w-100 p-5 ${className}`}
        style={{
          backgroundImage: `url(${
            rep?.wallpaper
              ? `http://localhost:3000/static/${rep?.wallpaper}`
              : "https://t4.ftcdn.net/jpg/07/22/55/05/360_F_722550509_HcSl2uXlToZd88q8OKGCtoO1LW5d8x8B.jpg"
          })`,
          objectFit: "cover",
        }}
      >
        <div
          className="d-flex align-items-center position-absolute p-3"
          style={{ left: 0, bottom: 0 }}
        >
          <img
            src={`http://localhost:3000/static/${
              rep?.profilePic || "default-profile-pic.jpg"
            }`}
            className="rounded-circle me-3"
            style={{
              height: imgSize,
              widht: imgSize,
              maxHeight: imgSize,
              maxWidth: imgSize,
            }}
          />
          <h3 className="text-white">{title}</h3>
        </div>
      </div>
    </>
  );
};

export default RepresentationCard;
