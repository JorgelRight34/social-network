import { useEffect, useState } from "react";
import api from "../../api";
import RoundedPill from "../RoundedPill";
import DialogBody from "../DialogBody";
import Dialog from "../Dialog";
import JoinRequest from "./JoinRequest";

const ManageJoinRequestsBtn = ({ network, className = "" }) => {
  const [requests, setRequests] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const getJoinRequests = async () => {
      const response = await api.get(`networks/${network?.id}/join-request`);
      return response.data;
    };

    getJoinRequests()
      .then(setRequests)
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <RoundedPill
        className={`border ${className}`}
        onClick={() => setShowDialog(true)}
      >
        Manage requests ({requests.length})
      </RoundedPill>
      <Dialog show={showDialog} className={"w-lg-25 rounded-3 p-3"}>
        <DialogBody title="Requests" onHide={() => setShowDialog(false)}>
          <div className="d-flex justify-content-center p-3">
            {requests.map((request) => (
              <JoinRequest request={request} />
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ManageJoinRequestsBtn;
