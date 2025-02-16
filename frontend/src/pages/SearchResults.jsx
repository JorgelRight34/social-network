import { useEffect, useState } from "react";
import CreateNetwork from "../components/Network/CreateNetwork";
import NetworksWidget from "../components/Network/NetworksWidget";
import api from "../api";
import RepresentationCard from "../components/RepresentationCard";
import Navbar from "../components/Navbar";
import NavbarSM from "../components/NavbarSM";
import { mobileWidth } from "../lib/constants";
import SearchBar from "../components/SearchBar";
import RoundedPill from "../components/RoundedPill";
import Post from "../components/Post/Post";
import { useNavigate } from "react-router";

const SearchResults = () => {
  const [networks, setNetworks] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stopFetchingMorePosts, setStopFetchingMorePosts] = useState(false);
  const [currentSection, setCurrentSection] = useState("NETWORKS");
  const [page, setPage] = useState(1);
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const fetchNetworks = async () => {
    const response = await api.get(
      `networks/?q=${params.get("q") || ""}&page=${page}`
    );
    if (response.data.length === 0) {
      setStopFetchingMorePosts(true);
    }
    return response.data;
  };

  const fetchUsers = async () => {
    const response = await api.get(
      `users/find/?q=${params.get("q") || ""}&page=${page}`
    );
    if (response.data.length === 0) {
      setStopFetchingMorePosts(true);
    }
    console.log(response.data);
    return response.data;
  };

  const fetchPosts = async () => {
    const response = await api.get(
      `posts/?q=${params.get("q") || ""}&page=${page}`
    );
    if (response.data.length === 0) {
      setStopFetchingMorePosts(true);
    }
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchNetworks()
      .then((data) => setNetworks((prev) => [...prev, ...data.data]))
      .catch((err) => console.error(err));

    fetchUsers()
      .then((data) => setUsers((prev) => [...prev, ...data]))
      .catch((err) => console.error(err));

    fetchPosts()
      .then((data) => setPosts((prev) => [...prev, ...data]))
      .catch((err) => console.error(err));
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (stopFetchingMorePosts) {
        return;
      }

      const { scrollTop, scrollHeight } = document.documentElement;
      const { innerHeight } = window;

      // Check if scrolled to the bottom
      if (scrollTop + innerHeight >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-primary p-3 d-block d-lg-none">
        <SearchBar />
      </div>
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div>
            <div className="d-flex p-3">
              <RoundedPill
                className="bg-primary border me-3"
                onClick={() => setCurrentSection("NETWORKS")}
              >
                Networks
              </RoundedPill>
              <RoundedPill
                className="bg-primary border me-3"
                onClick={() => setCurrentSection("USERS")}
              >
                Users
              </RoundedPill>
              <RoundedPill
                className="bg-primary border"
                onClick={() => setCurrentSection("POSTS")}
              >
                Posts
              </RoundedPill>
            </div>
          </div>
          <div
            className={`rounded-3`}
            style={{
              display: currentSection === "NETWORKS" ? "block" : "none",
            }}
          >
            {networks.length > 0 ? (
              networks.map((network, key) => (
                <div
                  key={key}
                  className="network border bg-primary rounded-3 mt-3"
                  onClick={() => navigate(`/network/${network.name}`)}
                >
                  <RepresentationCard
                    className="rounded-top border-top"
                    rep={network}
                    title={network.name}
                  />
                  {network.description ? (
                    <div className="p-3">
                      <p className="mb-0">{network.description}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <h1 className="text-white">No results</h1>
            )}
          </div>
          <div
            className={`rounded-3`}
            style={{
              display: currentSection === "USERS" ? "block" : "none",
            }}
          >
            {users.length > 0 ? (
              users.map((user, key) => (
                <div
                  key={key}
                  className="network border bg-primary rounded-3 mt-3"
                >
                  <RepresentationCard
                    className="rounded-top border-top"
                    rep={user}
                    title={user.username}
                  />
                </div>
              ))
            ) : (
              <h1 className="text-white">No results</h1>
            )}
          </div>
          <div
            className={`rounded-3`}
            style={{
              display: currentSection === "POSTS" ? "block" : "none",
            }}
          >
            {posts.length > 0 ? (
              posts.map((post, key) => <Post post={post} key={key} />)
            ) : (
              <h1 className="text-white">No results</h1>
            )}
          </div>
        </div>
        <div className="col-lg-3 d-none d-lg-block">
          <div className="bg-primary border p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center">
              <span className="me-auto">Networks</span>
              <CreateNetwork />
            </div>
            <NetworksWidget />
          </div>
        </div>
      </div>
      {window.innerWidth < mobileWidth ? <NavbarSM /> : ""}
    </div>
  );
};

export default SearchResults;
