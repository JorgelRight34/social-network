import { BrowserRouter as Router, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import store from "./store";
import { Provider } from "react-redux";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import NetworkPage from "./pages/NetworkPage";
import SearchResults from "./pages/SearchResults";
import CreatePage from "./pages/CreatePage";
import { useEffect } from "react";

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
          <Route path="/search/" element={<SearchResults />} />
          <Route path="/post/:network/:username/:id" element={<PostPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/network/:networkName" element={<NetworkPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
