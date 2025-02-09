import { useState } from "react";
import Dialog from "../Dialog";
import NewPostForm from "./NewPostForm";
import DialogBody from "../DialogBody";

const CreateBtn = ({ network, setPosts }) => {
  const [isDialogShowing, setIsDialogShowing] = useState(false);

  const hideDialog = () => {
    setIsDialogShowing(false);
  };

  return (
    <>
      <span
        className="rounded-pill border me-3 px-3 p-1 hover-accent shadow-sm"
        onClick={() => setIsDialogShowing(true)}
      >
        + Create Post
      </span>
      <Dialog className={"p-lg-3 w-50 rounded-3"} show={isDialogShowing}>
        <DialogBody title="Create Post" onHide={hideDialog}>
          <NewPostForm
            network={network}
            setPosts={setPosts}
            callback={hideDialog}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateBtn;
