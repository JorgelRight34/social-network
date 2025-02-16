import { useNavigate } from "react-router";
import ChatBtn from "./Chat/ChatBtn";
import { useSelector } from "react-redux";
import { useState } from "react";
import Dialog from "./Dialog";
import DialogBody from "./DialogBody";
import CreateBtn from "./Post/CreateBtn";
import CreateNetwork from "./Network/CreateNetwork";

const NavbarSM = ({ network }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <>
      <div
        className="row p-0 bg-primary navbar-sm justify-content-center shadow-sm border-top
                position-fixed bottom-0 w-100 mx-auto p-1"
      >
        <div className="col p-0 d-flex flex-column justify-content-center hover">
          <span
            className={`d-flex flex-column align-items-center p-2`}
            onClick={() => navigate("/")}
          >
            <span className="material-symbols-outlined mb-1">home</span>
          </span>
        </div>
        <div className="col p-0 d-flex flex-column justify-content-center hover">
          <span
            className={`d-flex flex-column align-items-center p-2`}
            onClick={() => navigate("/search/")}
          >
            <span className="material-symbols-outlined mb-1">search</span>
          </span>
        </div>
        <div className="col p-0 d-flex flex-column justify-content-center hover">
          <span
            className={`d-flex flex-column align-items-center p-2`}
            onClick={() => setShowCreateForm(true)}
          >
            <span className="material-symbols-outlined mb-1">add</span>
          </span>
        </div>
        {user ? (
          <div className="col p-0 d-flex flex-column justify-content-center hover">
            <ChatBtn>
              <span className={`d-flex flex-column align-items-center p-2`}>
                <span className="material-symbols-outlined mb-1">chat</span>
              </span>
            </ChatBtn>
          </div>
        ) : (
          ""
        )}
      </div>
      <Dialog
        className={`rounded-3`}
        show={showCreateForm}
        style={{ height: "auto", width: "auto" }}
      >
        <DialogBody title="Create" onHide={() => setShowCreateForm(false)}>
          <div className="rounded-3 p-5">
            {network ? (
              <CreateNetwork
                network={network}
                className="bg-primary w-100 mb-3"
              />
            ) : (
              ""
            )}
            <CreateBtn className="bg-primary w-100 mb-3" />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default NavbarSM;
