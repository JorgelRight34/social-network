import { useState } from "react";
import RoundedPill from "../RoundedPill";
import Dialog from "../Dialog";
import DialogBody from "../DialogBody";
import NetworkForm from "./NetworkForm";
import api from "../../api";
import DeleteNetworkBtn from "./DeleteNetworkBtn";

const EditNetworkBtn = ({ network, className = "", style = {} }) => {
  const [showDialog, setShowDialog] = useState(false);
  const backendURI = import.meta.env.VITE_BACKEND_URI;

  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <RoundedPill
        className={`bg-primary border ${className}`}
        onClick={() => setShowDialog(true)}
        style={style}
      >
        Edit network
      </RoundedPill>
      <Dialog show={showDialog} className={"w-50 rounded-3 p-3"}>
        <DialogBody title="+ Edit network" onHide={hideDialog}>
          <NetworkForm
            fetchData={(data) => api.put("networks/", data)}
            method="put"
            networkId={network.id}
            defaultFormData={{
              name: network.name,
              description: network.description,
              profilePic: network?.profilePic
                ? `${backendURI}static/${network?.profilePic}`
                : "",
              wallpaper: network?.wallpaper
                ? `${backendURI}static/${network?.wallpaper}`
                : "",
            }}
            callback={() => {
              window.location.reload();
            }}
          />
          <DeleteNetworkBtn
            callback={() => (window.location = "/")}
            className="mt-3 d-flex justify-content-center bg-danger"
            network={network}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default EditNetworkBtn;
