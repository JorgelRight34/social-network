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
import usePosts from "../hooks/usePosts";

const NetworkPage = () => {
  const [network, setNetwork] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const { page, stopFetching, setStopFetching } = usePage();
  const { posts, getPosts } = usePosts();
  const params = useParams();
  const { networkName } = params;
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!stopFetching) {
      // If hasn't reached a page with no new posts then try
      // to fetch again new posts
      const responseLength = getPosts();
      if (responseLength == 0) {
        // If no new posts then stop fetching
        setStopFetching(true);
      }
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
          className="rounded-top-3 shadow-lg"
          rep={network}
          title={network?.name}
        />
      </div>
      <div className="d-flex align-items-center mt-3">
        {isAdmin ? (
          <>
            <EditNetworkBtn
              className="me-3 shadow-sm bg-primary"
              network={network}
            />
            <ManageJoinRequestsBtn
              className="bg-primary shadow-sm me-3"
              network={network}
            />
          </>
        ) : (
          <JoinNetwork network={network} className="bg-primary shadow-sm" />
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
