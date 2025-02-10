import { Carousel } from "react-bootstrap";

const CustomCarousel = ({ media, size = 10, className = "" }) => {
  const isVideo = (media) => {
    const imageTypes = ["jpg", "png"];
    return imageTypes.some((type) => media.endsWith(type));
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
      <video width="640" height="360" controls>
        <source src={getMediaUrl(media)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <>
      {media.length > 0 ? (
        <div className={`bg-black ${className}`}>
          {media.length > 1 ? (
            <Carousel>
              {media.map((media, key) => (
                <Carousel.Item key={key}>
                  {isVideo(media) ? renderVideo(media) : renderImage(media)}
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            renderImage(media[0])
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomCarousel;
