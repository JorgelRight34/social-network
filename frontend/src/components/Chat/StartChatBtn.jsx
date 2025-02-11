import { useDispatch } from "react-redux";
import { startChat } from "../../actions/chat";
import RoundedPill from "../RoundedPill";

const StartChatBtn = ({ user, isGroup = false, className = "" }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(
      startChat({
        members: [user],
        isGroup,
      })
    );
  };

  return (
    <RoundedPill
      className={`border bg-secondary me-3 ${className}`}
      onClick={handleOnClick}
    >
      Chat
    </RoundedPill>
  );
};

export default StartChatBtn;
