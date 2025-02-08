import { useRef, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";
import useFormData from "../hooks/useFormData";

const Register = () => {
  const formRef = useRef();
  const [formData, setFormData] = useFormData();
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);

    await api.post("users/register", data).catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
  };

  return (
    <div
      className="bg-primary d-flex align-items-center justify-content-center"
      style={{ height: "100dvh" }}
    >
      <div className="bg-secondary rounded-4 p-5 w-50">
        <div className="d-flex mb-5 p-3 border-bottom">
          <h2>Sign Up</h2>
        </div>
        <form
          method="post"
          className="d-flex flex-column"
          ref={formRef}
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <input
            name="username"
            className="form-control mb-3"
            placeholder="Username"
            onBlur={setFormData()}
          />
          <input
            name="email"
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            onBlur={setFormData()}
          />
          <input
            name="password"
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            onBlur={setFormData()}
          />
          <input
            type="file"
            name="profile-pic"
            className="form-control mb-5"
            placeholder="Upload profile pic"
          />
          <div>
            <div className="mb-2">
              Already have an account?&nbsp;
              <a href="/login">Log In</a>
            </div>
            <button type="submit" className="btn btn-accent w-100 shadow-sm">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
