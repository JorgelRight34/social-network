import { useState } from "react";
import api from "../../api";
import RoundedPill from "../RoundedPill";
import Username from "../Username";

const JoinRequest = ({ request }) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const handleOnClick = async () => {
    if (hasAccepted) {
      // Avoid accepting multiple times
      return;
    }

    const response = await api.post("networks/accept-join-network-request", {
      joinRequestId: request.id,
    });

    if (response.status === 200) {
      // If succesful then prevent accepting multiple times and notify user
      setHasAccepted(true);
    }
  };

  return (
    <div className="d-flex border rounded-3 p-3">
      <Username className="me-3" user={request.User} />
      <RoundedPill className="bg-secondary" onClick={handleOnClick}>
        {hasAccepted ? "Request accepted" : "Accept join request"}
      </RoundedPill>
    </div>
  );
};

export default JoinRequest;
