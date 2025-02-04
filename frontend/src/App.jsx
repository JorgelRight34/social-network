import { BrowserRouter as Router, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import store from "./store";
import { Provider } from "react-redux";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:username/:id" element={<PostPage />} />
          <Route path="/:username" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
