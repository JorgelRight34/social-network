import ImageInput from "../ImageInput";
import { Carousel } from "react-bootstrap";
import useCreatePost from "../../hooks/useCreatePost";

const NewPostForm = ({ network, callback, setPosts }) => {
  const { formRef, onSubmit, files, setFiles } = useCreatePost();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const newPost = await onSubmit();
    callback();
    setPosts((prev) => [newPost, ...prev]);
    formRef.current.reset(); // Reset form
    window.location.reload();
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
