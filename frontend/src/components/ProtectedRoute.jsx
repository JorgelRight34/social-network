import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  const { user, loadUser } = useAuth();

  const auth = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    }

    const decoded = jwtDecode(accessToken);
    const now = Date.now() / 1000;

    if (now > decoded.exp) {
      await refreshToken();
    } else {
      setIsAuthenticated(true);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await api.post("users/refresh", {
        refreshToken: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    if (!user) loadUser();
  }, [isAuthenticated]);

  return isAuthenticated ? children : <div>Loading...</div>;
};

export default ProtectedRoute;
