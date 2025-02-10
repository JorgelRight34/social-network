import api from "../../api";
import { useRef, useState } from "react";
import ImageInput from "../ImageInput";
import { Carousel } from "react-bootstrap";

const NewPostForm = ({ network, callback, setPosts }) => {
  const formRef = useRef();
  const [files, setFiles] = useState({});

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);
    let response;

    Object.keys(files).forEach((key) => data.append("files", files[key]));

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
        <Carousel>
          {[...Array(Object.keys(files).length + 1).keys()].map((key) => (
            <Carousel.Item key={key}>
              <ImageInput
                fileKey={key}
                setFiles={setFiles}
                className="rounded-3 mb-5 mb-lg-3"
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <input type="hidden" name="networkId" value={network?.id || ""} />

        <input
          className="form-control mb-5 mb-lg-3"
          name="title"
          placeholder="Title"
        />

        <input
          className="form-control mb-5 mb-lg-3"
          name="body"
          placeholder="Body"
        />

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
