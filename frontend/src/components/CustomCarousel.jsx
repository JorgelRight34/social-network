import { Carousel } from "react-bootstrap";

const CustomCarousel = ({ media, size = 10, className = "" }) => {
  const renderImage = (media) => {
    return (
      <img
        className="img-fluid w-100"
        src={`http://localhost:3000/static/${media}`}
        style={{ height: `${size * 1.6}rem`, objectFit: "contain" }}
      />
    );
  };

  return (
    <>
      {media.length > 0 ? (
        <div className={`bg-black ${className}`}>
          {media.length > 1 ? (
            <Carousel>
              {media.map((media) => (
                <Carousel.Item>{renderImage(media)}</Carousel.Item>
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
