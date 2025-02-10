import RoundedPill from "../RoundedPill";
import ChatCard from "./ChatCard";

const ChatWidget = ({ show, onHide, className = "", style = {} }) => {
  return (
    <div
      className={`bg-secondary ${show ? "" : "d-none"} ${className}`}
      style={{ minHeight: "75vh", minWidth: "25vw", ...style }}
    >
      <div className="d-flex align-items-center p-3 border-bottom">
        <h4 className="me-auto mb-0">Chats</h4>
        <span className={`d-flex flex-column align-items-center p-2`}>
          <span className="material-symbols-outlined hover" onClick={onHide}>
            close
          </span>
        </span>
      </div>
      <div className="d-flex p-3">
        <RoundedPill className="bg-primary border me-3">Users</RoundedPill>
        <RoundedPill className="bg-primary border me-3">Groups</RoundedPill>
      </div>
      <div className="p-3">
        <ChatCard />
      </div>
    </div>
  );
};

export default ChatWidget;
