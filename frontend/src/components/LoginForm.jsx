import api from "../api";
import useFormData from "../hooks/useFormData";
import { useNavigate } from "react-router";

const LoginForm = ({}) => {
  const [formData, handleOnBlur] = useFormData();
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const response = await api
      .post(
        "users/login",
        {
          username: formData.username.replace(" ", ""),
          password: formData.password.replace(" ", ""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    navigate("/");
  };

  return (
    <div className="bg-secondary rounded-4 p-5 w-50">
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
          onBlur={handleOnBlur()}
        />
        <input
          className="form-control shadow-sm mb-5"
          name="password"
          type="password"
          placeholder="Password"
          onBlur={handleOnBlur()}
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
