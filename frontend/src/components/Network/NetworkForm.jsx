import { data } from "react-router";
import api from "../../api";
import { useRef } from "react";

const NetworkForm = ({}) => {
  const formRef = useRef();
  const profilePicInputRef = useRef();
  const wallpaperInputRef = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let response;
    const data = new FormData(formRef.current);
    data.set("profilePic", profilePicInputRef.current.files[0]);
    data.set("wallpaper", wallpaperInputRef.current.files[0]);

    try {
      response = await api.post("networks/", data);
    } catch (err) {
      console.log(err);
      return;
    }

    console.log(response.data);
  };

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => handleOnSubmit(e)}
        encType="multipart/form-data"
        ref={formRef}
      >
        <input className="form-control mb-3" name="name" placeholder="Name" />

        <input
          className="form-control mb-3"
          name="description"
          placeholder="Description"
        />

        <input
          className="form-control mb-3"
          type="file"
          name="profilePic"
          ref={profilePicInputRef}
        />

        <input
          className="form-control mb-3"
          type="file"
          name="wallpaper"
          ref={wallpaperInputRef}
        />

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default NetworkForm;
