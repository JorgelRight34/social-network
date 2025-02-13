import { useDispatch, useSelector } from "react-redux";
import CreateBtn from "./Post/CreateBtn";
import Username from "./Username";
import RoundedPill from "./RoundedPill";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { loginUser, logout } from "../actions/user";
import SearchBar from "./SearchBar";
import { mobileWidth } from "../lib/constants";
import ChatBtn from "./Chat/ChatBtn";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      dispatch(loginUser());
    }
  });

  if (window.innerWidth < mobileWidth) return;

  return (
    <header className="sticky-top shadow-sm">
      <nav className="navbar bg-primary">
        <div className="container d-flex align-items-center px-3">
          <div className="col-3 d-flex align-items-center">
            <a
              className="navbar-brand text-white hover me-5"
              onClick={() => navigate("/")}
            >
              Deep
            </a>
            <CreateBtn className="bg-secondary" />
          </div>
          <div className="col-6">
            <SearchBar />
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            {user ? (
              <>
                <ChatBtn className="bg-secondary me-3" />
                <RoundedPill
                  className="bg-secondary border me-3"
                  onClick={handleLogout}
                >
                  Log out
                </RoundedPill>
                <span>
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
