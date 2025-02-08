import api from "../../api";
import { useRef } from "react";

const NewPostForm = ({ network }) => {
  const formRef = useRef();
  const fileInputRef = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);

    data.append("files", fileInputRef.current.files[0]);

    try {
      await api.post("http://localhost:3000/posts/", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => handleOnSubmit(e)}
        encType="multipart/form-data"
        ref={formRef}
      >
        {network?.id}
        <input type="hidden" name="networkId" value={network?.id} />

        <input className="form-control mb-3" name="title" placeholder="Title" />

        <input className="form-control mb-3" name="body" placeholder="Body" />

        <input className="form-control mb-3" type="file" ref={fileInputRef} />

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
