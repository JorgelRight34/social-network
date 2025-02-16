import { useEffect, useState } from "react";
import api from "../../api";
import RoundedPill from "../RoundedPill";

const JoinNetwork = ({ network, className = "" }) => {
  const [hasSentRequest, setHasSentRequest] = useState(false);

  const handleOnClick = async () => {
    if (hasSentRequest) {
      // Avoid sending multiple requests
      return;
    }

    try {
      const response = await api.post("networks/join-request", {
        networkId: network.id,
      });
      console.log("repsonse", response.data);
      setHasSentRequest(true);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  useEffect(() => {
    const getJoinNetworkRequests = async () => {
      const response = await api.get("networks/join-request");
      return response.data;
    };

    getJoinNetworkRequests()
      .then((data) =>
        setHasSentRequest(
          data.some((joinRequest) => joinRequest.networkId === network.id)
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <RoundedPill className={`border ${className}`} onClick={handleOnClick}>
        {hasSentRequest ? "Pending request" : "Send join request"}
      </RoundedPill>
    </>
  );
};

export default JoinNetwork;
