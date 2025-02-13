import Post from "../components/Post/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import CreateBtn from "../components/Post/CreateBtn";
import RepresentationCard from "../components/RepresentationCard";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import EditNetworkBtn from "../components/Network/EditNetworkBtn";
import NetworksWidget from "../components/Network/NetworksWidget";
import RecentPostsWidget from "../components/Post/RecentPostsWidget";

const NetworkPage = ({}) => {
  const [network, setNetwork] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [stopFetchingMorePosts, setStopFetchingMorePosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const params = useParams();
  const { networkName } = params;
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getPosts = async () => {
      let response;
      try {
        response = await api.get(`posts/${networkName}/?page=${page}`);
        if (response.data.length === 0) {
          setStopFetchingMorePosts(true);
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }

      setPosts((prev) => [...prev, ...response.data]);
    };

    getPosts();
  }, [page]);

  useEffect(() => {
    const getNetwork = async () => {
      const response = await api.get(`networks/${networkName}`);
      return response.data;
    };

    try {
      getNetwork().then(setNetwork);
    } catch (err) {
      console.error(err);
      return;
    }
  }, [page]);

  useEffect(() => {
    if (!network || !user) {
      return;
    }

    const foundAdmin = network.admins?.filter(
      (admin) => admin.User?.username === user.username
    )?.[0];

    if (foundAdmin) {
      setIsAdmin(foundAdmin);
    }
  }, [network]);

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
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="position-relative">
            <RepresentationCard
              className="rounded-top-3"
              rep={network}
              title={network?.name}
            />
            {isAdmin ? <EditNetworkBtn network={network} /> : ""}
          </div>
          <div className="bg-primary rounded-3">
            {posts.map((post, key) => (
              <Post key={key} className="mt-3" post={post} />
            ))}
          </div>
        </div>
        <div className="col-lg-3">
          {" "}
          <NetworksWidget />
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
