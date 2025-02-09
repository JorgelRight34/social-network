import api from "../../api";
import { useRef } from "react";
import ImageInput from "../ImageInput";

const NewPostForm = ({ network, callback, setPosts }) => {
  const formRef = useRef();
  const fileInputRef = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);
    let response;

    data.append("files", fileInputRef.current.files[0]);

    try {
      response = await api.post("http://localhost:3000/posts/", data);
    } catch (err) {
      console.log(err);
      return;
    }

    callback();
    setPosts((prev) => [response.data, ...prev]);
    formRef.current.reset(); // Reset form
  };

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => handleOnSubmit(e)}
        encType="multipart/form-data"
        ref={formRef}
      >
        <ImageInput ref={fileInputRef} className="rounded-3 mb-3" />

        <input type="hidden" name="networkId" value={network?.id || ""} />

        <input className="form-control mb-3" name="title" placeholder="Title" />

        <input className="form-control mb-3" name="body" placeholder="Body" />

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
