import { useNavigate } from "react-router";

const NavbarSM = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="row p-0 bg-primary navbar-sm justify-content-center shadow-sm border-top
                position-fixed bottom-0 start-50 translate-middle-x w-100 mx-auto p-1"
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
            onClick={() => navigate("/create")}
          >
            <span className="material-symbols-outlined mb-1">add</span>
          </span>
        </div>
        <div className="col p-0 d-flex flex-column justify-content-center hover">
          <span className={`d-flex flex-column align-items-center p-2`}>
            <span className="material-symbols-outlined mb-1">chat</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default NavbarSM;
