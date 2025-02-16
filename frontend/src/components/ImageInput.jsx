import { forwardRef, useRef, useState } from "react";

const ImageInput = ({
  fileKey,
  setFiles,
  size = "20rem",
  videoSize = "400",
  defaultImageUrl = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg",
  className = "",
  ref,
}) => {
  const imageRef = useRef();
  const [fileType, setFileType] = useState("image");
  const [fileUrl, setFileUrl] = useState("");

  const handleOnChange = (event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    const newFileType = file.type.startsWith("image")
      ? "image"
      : file.type.startsWith("video")
      ? "video"
      : "other";
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFileUrl(imageUrl); // Update image source
      setFileType(newFileType); // Update file type (image or video)
      setFiles((prev) => ({ ...prev, [fileKey]: file }));
    } else {
      setFileUrl(defaultImageUrl); // Update image source
      setFileType("image");
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
      {fileType === "image" ? (
        <img
          className={`img-fluid hover ${className}`}
          src={fileUrl || defaultImageUrl}
          style={{ height: size, maxHeight: size, width: size, maxWidth: size }}
          ref={imageRef}
        />
      ) : (
        <video controls width={videoSize} height={videoSize}>
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </label>
  );
};

export default ImageInput;
