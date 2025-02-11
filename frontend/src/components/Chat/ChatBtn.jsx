import { useState } from "react";
import RoundedPill from "../RoundedPill";
import ChatWidget from "./ChatWidget";

const ChatBtn = ({ className }) => {
  const [isChatShowing, setIsChatShowing] = useState(false);

  return (
    <>
      <RoundedPill
        className={`border ${className}`}
        onClick={() => setIsChatShowing(true)}
      >
        <span className="material-symbols-outlined">chat</span>
      </RoundedPill>
      <ChatWidget
        show={isChatShowing}
        setShow={setIsChatShowing}
        className={"position-fixed bottom-0 rounded-3 border"}
        style={{ zIndex: 90 }}
        onHide={() => setIsChatShowing(false)}
      />
    </>
  );
};

export default ChatBtn;
