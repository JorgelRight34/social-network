import Post from "../components/Post/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import RepresentationCard from "../components/RepresentationCard";
import { useSelector } from "react-redux";
import EditNetworkBtn from "../components/Network/EditNetworkBtn";
import Layout from "../components/Layout";
import usePage from "../hooks/usePage";
import JoinNetwork from "../components/Network/JoinNetwork";
import ManageJoinRequestsBtn from "../components/Network/ManageJoinRequestsBtn";

const NetworkPage = ({}) => {
  const [network, setNetwork] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, , stopFetchingMorePosts, setStopFetchingMorePosts] = usePage();
  const [posts, setPosts] = useState([]);
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

    if (!stopFetchingMorePosts) {
      getPosts();
    }
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

  return (
    <Layout network={network}>
      <div className="position-relative mt-3 mt-lg-0 mb-3 mb-lg-0">
        <RepresentationCard
          className="rounded-top-3"
          rep={network}
          title={network?.name}
        />
      </div>
      <div className="d-flex align-items-center mt-3">
        {isAdmin ? (
          <>
            <EditNetworkBtn className="me-3 bg-primary" network={network} />
            <ManageJoinRequestsBtn
              className="bg-primary me-3"
              network={network}
            />
          </>
        ) : (
          <JoinNetwork network={network} className="bg-primary" />
        )}
      </div>

      <div className="bg-primary rounded-3">
        {posts.map((post, key) => (
          <Post key={key} className="mt-3" post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default NetworkPage;
