import { useEffect, useState } from "react";
import RoundedPill from "../RoundedPill";
import ChatCard from "./ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { closeChat, startChat } from "../../actions/chat";
import Chat from "./Chat";
import useChats from "../../hooks/useChats";

const ChatWidget = ({ show, setShow, onHide, className = "", style = {} }) => {
  const [currentSection, setCurrentSection] = useState("CHATS");
  const { currentChat, chats } = useSelector((state) => state.chats);
  const { getChats } = useChats;
  const dispatch = useDispatch();

  useEffect(() => {
    // running?
    if (currentChat) {
      setCurrentSection("CHAT");
    } else {
      return;
    }

    // returning
    if (show) return;

    setShow(true);
  }, [currentChat]);

  useEffect(() => {
    if (currentSection === "CHATS" || chats?.length === 0) {
      // Fetch again if chats are clicked again
      getChats();
    }
  }, [currentSection]);

  return (
    <div
      className={`chat-widget bg-secondary ${
        show ? "" : "d-none"
      } ${className}`}
      style={{ minHeight: "75vh", minWidth: "25vw", ...style }}
    >
      <div className="d-flex align-items-center p-3 border-bottom">
        <h4 className="me-auto mb-0">Chats</h4>
        <span className={`d-flex flex-column align-items-center p-2`}>
          <span
            className="material-symbols-outlined hover"
            onClick={() => {
              onHide();
              dispatch(closeChat()); // To make start chatBtn work again
            }}
          >
            close
          </span>
        </span>
      </div>
      <div className="d-flex p-3">
        <RoundedPill
          onClick={() => setCurrentSection("CHATS")}
          className={`${
            currentSection === "CHATS" ? "bg-white text-accent" : "bg-primary"
          } border me-3`}
        >
          Chats
        </RoundedPill>
      </div>
      {/* Chats */}
      <div
        className={`chats-div p-3 ${
          currentSection === "CHATS" ? "" : "d-none"
        }`}
        style={{ height: "50vh", overflowY: "auto" }}
      >
        {chats.map((chat) => (
          <ChatCard
            chat={chat}
            className="mb-3 shadow-sm"
            key={chat?.chatId}
            onClick={() => {
              dispatch(startChat(chat));
              setCurrentSection("CHAT");
            }}
          />
        ))}
      </div>
      {/* Chat View */}
      <div
        className={`p-3 ${
          currentSection == "CHAT" ? "" : "d-none"
        } border-top bg-primary`}
      >
        {/* Messages */}
        <Chat
          chat={currentChat}
          onHide={() => setCurrentSection("CHATS")}
          style={{ height: "50vh" }}
        />
      </div>
    </div>
  );
};

export default ChatWidget;
