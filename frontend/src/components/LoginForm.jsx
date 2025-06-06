import { useNavigate } from "react-router";
import useLogin from "../hooks/useAuth";

const LoginForm = () => {
  const { login, handleOnBlur } = useLogin();
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const result = await login();
    if (!result) {
      alert("Invalid username or password.");
      return;
    }
    navigate("/");
  };

  return (
    <div className="bg-secondary rounded-4 p-3  p-lg-5 w-lg-50">
      <div className="d-flex mb-5 p-3 border-bottom">
        <h2>Log In</h2>
      </div>
      <form
        method="post"
        className="d-flex flex-column"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <input
          className="form-control shadow-sm mb-3"
          name="username"
          placeholder="Username"
          onBlur={handleOnBlur}
        />
        <input
          className="form-control shadow-sm mb-5"
          name="password"
          type="password"
          placeholder="Password"
          onBlur={handleOnBlur}
        />
        <div>
          <div className="mb-2">
            New to Deep?&nbsp;
            <a href="/register">Sign Up</a>
          </div>
          <button type="submit" className="btn btn-accent w-100 shadow-sm">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
