import api from "../../api";
import RoundedPill from "../RoundedPill";

const DeleteNetworkBtn = ({ network, callback, className = "" }) => {
  const handleOnClick = async () => {
    let response;

    if (!confirm("Are you sure you wanna delete this network?")) {
      return;
    }

    try {
      response = await api.delete(`networks/${network.id}`);
      callback();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <RoundedPill className={`border ${className}`} onClick={handleOnClick}>
      <span>Delete</span>
    </RoundedPill>
  );
};

export default DeleteNetworkBtn;
