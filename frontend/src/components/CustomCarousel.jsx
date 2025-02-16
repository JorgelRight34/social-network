import { Carousel } from "react-bootstrap";

const CustomCarousel = ({ media, size = 10, className = "" }) => {
  const isVideo = (media) => {
    const videoTypes = ["MP3", "MP4", "GIF"];
    return videoTypes.some((type) => media.toUpperCase().endsWith(type));
  };

  const getMediaUrl = (media) => {
    return `${import.meta.env.VITE_BACKEND_URI}static/${media}`;
  };

  const renderImage = (media) => {
    return (
      <img
        className="img-fluid w-100"
        src={getMediaUrl(media)}
        style={{ height: `${size * 1.6}rem`, objectFit: "contain" }}
      />
    );
  };

  const renderVideo = (media) => {
    return (
      <div className="d-flex justify-content-center">
        <video style={{ width: "100%" }} controls>
          <source src={getMediaUrl(media)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  return (
    <>
      {media?.length > 0 ? (
        <div className={`bg-black ${className}`}>
          {media?.length > 1 ? (
            <Carousel>
              {media.map((media, key) => (
                <Carousel.Item key={key}>
                  {isVideo(media) ? renderVideo(media) : renderImage(media)}
                </Carousel.Item>
              ))}
            </Carousel>
          ) : isVideo(media[0]) ? (
            renderVideo(media[0])
          ) : (
            renderImage(media)
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomCarousel;
