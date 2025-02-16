const RepresentationCard = ({
  rep,
  size = 70,
  className = "",
  title = "",
  noWallpaper = false,
}) => {
  const imgSize = `${size}px`;

  return (
    <>
      <div
        className={`position-relative w-100 p-5 ${className}`}
        style={
          noWallpaper
            ? {}
            : {
                backgroundImage: `url(${
                  rep?.wallpaper
                    ? `http://localhost:3000/static/${rep?.wallpaper}`
                    : "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
                })`,
                objectFit: "cover",
              }
        }
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
