import { useEffect, useState } from "react";
import CreateNetwork from "../components/Network/CreateNetwork";
import NetworksWidget from "../components/Network/NetworksWidget";
import api from "../api";
import RepresentationCard from "../components/RepresentationCard";
import Navbar from "../components/Navbar";
import NavbarSM from "../components/NavbarSM";
import { mobileWidth } from "../lib/constants";
import SearchBar from "../components/SearchBar";

const SearchResults = () => {
  const [networks, setNetworks] = useState([]);
  const [stopFetchingMorePosts, setStopFetchingMorePosts] = useState(false);
  const [page, setPage] = useState(1);
  const params = new URLSearchParams(location.search);

  const fetchNetworks = async () => {
    const response = await api.get(
      `networks/?q=${params.get("q") || ""}&page=${page}`
    );
    if (response.data.length === 0) {
      setStopFetchingMorePosts(true);
    }
    return response.data;
  };

  useEffect(() => {
    fetchNetworks()
      .then((data) => setNetworks((prev) => [...prev, ...data.data]))
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
      <div className="bg-primary p-3 sticky-top d-block d-lg-none">
        <SearchBar />
      </div>
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="rounded-3">
            {networks.map((network, key) => (
              <div
                key={key}
                className="network border bg-primary rounded-3 mt-3"
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
            ))}
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
