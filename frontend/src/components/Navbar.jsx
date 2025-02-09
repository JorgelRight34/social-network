import { useDispatch, useSelector } from "react-redux";
import CreateBtn from "./Post/CreateBtn";
import Username from "./Username";
import RoundedPill from "./RoundedPill";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { loginUser } from "../actions/user";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loginUser());
    }
  });

  return (
    <header className="sticky-top shadow-sm">
      <nav className="navbar bg-primary">
        <div className="container d-flex align-items-center px-3">
          <div className="col-3">
            <a
              className="navbar-brand text-white hover"
              onClick={() => navigate("/")}
            >
              Deep
            </a>
          </div>
          <div className="col-6">
            <input
              className="form-control rounded-pill"
              placeholder="Search on Deep"
            />
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            <CreateBtn />
            {user ? (
              <span>
                <Username className="hover" user={user} />
              </span>
            ) : (
              <>
                <RoundedPill
                  className="bg-primary border me-3"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </RoundedPill>
                <RoundedPill
                  className="bg-primary border"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
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
