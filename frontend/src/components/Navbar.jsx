import CreateBtn from "./Post/CreateBtn";
import Username from "./Username";
import RoundedPill from "./RoundedPill";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import { mobileWidth } from "../lib/constants";
import ChatBtn from "./Chat/ChatBtn";
import useAuth from "../hooks/useAuth";

const Navbar = ({ network }) => {
  const navigate = useNavigate();
  const { user, handleLogout, loadUser } = useAuth();

  const handleUserLogout = () => {
    handleLogout();
    navigate("/login");
  };

  useEffect(() => {
    if (!user) loadUser();
  });

  if (window.innerWidth < mobileWidth) return;

  return (
    <header className="sticky-top shadow-sm">
      <nav className="bg-primary px-0">
        <div className="p-2 px-5 d-flex align-items-center p-0 w-100">
          <div className="col-3 d-flex align-items-center px-3">
            <a
              className="navbar-brand text-white hover me-5 d-flex align-items-center"
              onClick={() => navigate("/")}
            >
              <img
                className="me-2"
                style={{ height: "1.5rem" }}
                src="/favicon.ico"
              />
              <h5 className="mb-0">My Network</h5>
            </a>
            {network ? (
              <CreateBtn network={network} className="bg-secondary" />
            ) : (
              ""
            )}
          </div>
          <div className="col-6">
            <SearchBar />
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            {user ? (
              <>
                <ChatBtn className="bg-secondary me-3 ms-3" />
                <RoundedPill
                  className="bg-secondary border me-3 d-flex align-items-center"
                  onClick={handleUserLogout}
                >
                  <span className="material-symbols-outlined me-1">logout</span>
                  Log out
                </RoundedPill>
                <span className="rounded-pill border p-1 px-3 bg-secondary">
                  <Username className="hover" user={user} />
                </span>
              </>
            ) : (
              <>
                <RoundedPill
                  className="bg-secondary border me-3"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </RoundedPill>
                <RoundedPill
                  className="bg-secondary border"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </RoundedPill>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
