import { useState } from "react";
import RoundedPill from "../RoundedPill";
import Dialog from "../Dialog";
import DialogBody from "../DialogBody";
import NetworkForm from "./NetworkForm";
import api from "../../api";

const CreateNetwork = ({ className = "" }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOnClick = () => {
    setShowDialog(true);
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <RoundedPill className={`border ${className}`} onClick={handleOnClick}>
        + Create network
      </RoundedPill>
      <Dialog show={showDialog} className={"w-50 rounded-3 p-3"}>
        <DialogBody title="+ Create network" onHide={hideDialog}>
          <NetworkForm
            callback={hideDialog}
            fetchData={(data) => api.post("networks/", data)}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateNetwork;
