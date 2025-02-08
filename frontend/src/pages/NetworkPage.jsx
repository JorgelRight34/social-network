import Post from "../components/Post/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import CreateBtn from "../components/Post/CreateBtn";
import RepresentationCard from "../components/RepresentationCard";
import Navbar from "../components/Navbar";

const NetworkPage = ({}) => {
  const [network, setNetwork] = useState();
  const [posts, setPosts] = useState([]);
  const params = useParams();
  console.log(params);
  const { networkName } = params;

  useEffect(() => {
    const getPosts = async () => {
      let response;
      try {
        response = await api.get(`posts/${networkName}`);
      } catch (err) {
        console.log(err);
        return;
      }

      setPosts(response.data);
    };

    getPosts();
  }, []);

  useEffect(() => {
    const getNetwork = async () => {
      const response = await api.get(`networks/${networkName}`);
      return response.data;
    };

    try {
      getNetwork().then(setNetwork);
    } catch (err) {
      console.err(err);
      return;
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row mx-0 d-flex justify-content-center p-lg-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          {network ? (
            <RepresentationCard
              className="rounded-top-3"
              rep={network}
              title={network.name}
            />
          ) : (
            ""
          )}
          <div className="bg-primary rounded-3">
            {posts.map((post) => (
              <Post key={post._id} className="mt-3" post={post} />
            ))}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="bg-primary border p-3 rounded-3 shadow-sm">
            &nbsp;
            <CreateBtn network={network} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
