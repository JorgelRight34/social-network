import { useRef, useState } from "react";
import ImageInput from "../ImageInput";
import useFormData from "../../hooks/useFormData";

const NetworkForm = ({
  callback,
  fetchData,
  defaultFormData,
  networkId,
  method = "post",
}) => {
  const formRef = useRef();
  const [formData, setFormData] = useFormData({
    name: defaultFormData?.name || "",
    description: defaultFormData?.description || "",
  });
  const [files, setFiles] = useState({});
  const wallpaperInputRef = useRef();
  const wallpaperRef = useRef();
  const defaultWallpaperUrl = `https://t4.ftcdn.net/jpg/07/22/55/05/360_F_722550509_HcSl2uXlToZd88q8OKGCtoO1LW5d8x8B.jpg`;

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(formRef.current);
    if (networkId) {
      data.set("networkId", networkId);
    }

    const profilePic = files["profilePic"];
    const wallpaper = wallpaperInputRef.current.files[0];

    if (profilePic) {
      data.set("profilePic", profilePic);
    }

    if (wallpaper) {
      data.set("wallpaper", wallpaper);
    }

    try {
      const response = await fetchData(data);
      callback(); // Call the callback after successful submission
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleOnWallpaperChange = (event) => {
    event.preventDefault();
    const file = wallpaperInputRef.current.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      wallpaperRef.current.style.backgroundImage = `url(${imageUrl})`;
    } else {
      wallpaperRef.current.style.backgroundImage = `url(${defaultWallpaperUrl})`;
    }
  };

  return (
    <>
      <form
        method={method}
        onSubmit={(e) => handleOnSubmit(e)}
        encType="multipart/form-data"
        ref={formRef}
      >
        <div
          className={`position-relative w-100 p-5 mb-5 mb-lg-3 rounded-3`}
          role="button"
          tabIndex="0"
          style={{
            backgroundImage: `url(${
              defaultFormData?.wallpaper || defaultWallpaperUrl
            })`,
            objectFit: "cover",
          }}
          ref={wallpaperRef}
          onClick={(event) => {
            event.stopPropagation();
            wallpaperInputRef.current.click();
          }}
        >
          <input
            className="d-none"
            type="file"
            name="wallpaper"
            ref={wallpaperInputRef}
            onChange={handleOnWallpaperChange}
          />

          <div
            className="d-flex align-items-center position-absolute p-3"
            style={{ left: 0, bottom: 0 }}
          >
            <ImageInput
              size="70px"
              fileKey={"profilePic"}
              setFiles={setFiles}
              className="rounded-circle"
              defaultImageUrl={defaultFormData?.profilePic}
            />
          </div>
        </div>
        <input
          className="form-control mb-5 mb-lg-3"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={setFormData}
          required
        />

        <input
          className="form-control mb-5 mb-lg-3"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={setFormData}
          required
        />

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default NetworkForm;
