import { useState } from "react";
import RoundedPill from "../RoundedPill";
import Dialog from "../Dialog";
import DialogBody from "../DialogBody";
import NetworkForm from "./NetworkForm";

const CreateNetwork = ({}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOnClick = () => {
    setShowDialog(true);
  };

  return (
    <>
      <RoundedPill onClick={handleOnClick}>+ Create Network</RoundedPill>
      <Dialog show={showDialog} className={"rounded-3 p-3"}>
        <DialogBody
          title="+ Create Network"
          onHide={() => setShowDialog(false)}
        >
          <NetworkForm />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateNetwork;
