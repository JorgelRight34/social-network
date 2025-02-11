import { useEffect, useState } from "react";
import RoundedPill from "../RoundedPill";
import ChatCard from "./ChatCard";
import { useDispatch, useSelector } from "react-redux";
import SearchUserBar from "./SearchUserBar";
import { setChats, startChat } from "../../actions/chat";
import Chat from "./Chat";
import api from "../../api";

const ChatWidget = ({ show, setShow, onHide, className = "", style = {} }) => {
  const [currentSection, setCurrentSection] = useState("CHATS");
  const { currentChat, chats } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentChat) {
      setCurrentSection("CHAT");
    } else {
      return;
    }

    if (show) return;

    setShow(true);
  }, [currentChat]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await api.get("chats/");
      console.log("responses", response.data);
      dispatch(setChats(response.data));
      return response.data;
    };

    if (chats?.length === 0) {
      fetchChats();
    }
  }, []);

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
        <RoundedPill
          onClick={() => setCurrentSection("CHATS")}
          className="bg-primary border me-3"
        >
          Chats
        </RoundedPill>
        <RoundedPill className="bg-primary border me-3">Groups</RoundedPill>
      </div>
      {/* Chats */}
      <div
        className={`p-3 ${currentSection === "CHATS" ? "" : "d-none"}`}
        style={{ height: "50vh", overflowY: "auto" }}
      >
        <SearchUserBar className={"mb-3"} />
        {chats.map((chat, key) => (
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
