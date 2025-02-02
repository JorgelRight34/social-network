import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/user";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();

    const auth = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            console.log("There's not an access token")
            setIsAuthenticated(false)
            return
        }

        const decoded = jwtDecode(accessToken)
        const now = Date.now() / 1000;

        if (now > decoded.exp) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await api.post('users/refresh', {
                refreshToken: refreshToken
            });
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                setIsAuthenticated(true);
            }
        } catch (err) {
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        auth();
    }, [])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        
        if (!user) {
            dispatch(loginUser());
        }
    }, [isAuthenticated])


    return isAuthenticated ? children : <div>Loading...</div>
}

export default ProtectedRoute