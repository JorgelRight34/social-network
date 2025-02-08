import { useState } from "react";
import Dialog from "../Dialog";
import NewPostForm from "./NewPostForm";
import DialogBody from "../DialogBody";

const CreateBtn = ({ network }) => {
  const [isDialogShowing, setIsDialogShowing] = useState(false);

  return (
    <>
      <span
        className="rounded-pill border me-3 px-3 p-1 hover-accent shadow-sm"
        onClick={() => setIsDialogShowing(true)}
      >
        + Create
      </span>
      <Dialog className={"p-lg-3"} show={isDialogShowing}>
        <DialogBody title="Create" onHide={() => setIsDialogShowing(false)}>
          <NewPostForm network={network} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateBtn;
