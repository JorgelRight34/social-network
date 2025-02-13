import { forwardRef, useRef } from "react";

const ImageInput = ({
  fileKey,
  setFiles,
  size = "20rem",
  defaultImageUrl = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg",
  className = "",
  ref,
}) => {
  const imageRef = useRef();

  const handleOnChange = (event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imageRef.current.src = imageUrl; // Update image source
      setFiles((prev) => ({ ...prev, [fileKey]: file }));
    } else {
      imageRef.current.src = defaultImageUrl;
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
    }
  };

  return (
    <label
      className={`d-flex justify-content-center`}
      onClick={(event) => event.stopPropagation()}
    >
      {/* Hidden file input */}
      <input
        ref={ref}
        type="file"
        style={{ visibility: "hidden", position: "absolute" }}
        onChange={handleOnChange}
      />

      {/* Clickable image */}
      <img
        className={`img-fluid hover ${className}`}
        src={defaultImageUrl}
        style={{ height: size, maxHeight: size, width: size, maxWidth: size }}
        ref={imageRef}
      />
    </label>
  );
};

export default ImageInput;
