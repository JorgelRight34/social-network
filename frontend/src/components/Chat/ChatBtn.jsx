import { useState } from "react";
import RoundedPill from "../RoundedPill";
import ChatWidget from "./ChatWidget";

const ChatBtn = ({ children, className }) => {
  const [isChatShowing, setIsChatShowing] = useState(false);

  return (
    <>
      {children ? (
        <div onClick={() => setIsChatShowing((prev) => !prev)}>{children}</div>
      ) : (
        <RoundedPill
          className={`border ${className}`}
          onClick={() => setIsChatShowing((prev) => !prev)}
        >
          <span className="material-symbols-outlined">chat</span>
        </RoundedPill>
      )}

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
