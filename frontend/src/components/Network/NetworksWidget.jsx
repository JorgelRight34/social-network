import { useEffect, useState } from "react";
import api from "../../api";
import Network from "./Network";

const NetworksWidget = ({}) => {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const getNetworks = async () => {
      const response = await api.get("networks/");
      console.log(response.data);
      return response.data;
    };

    getNetworks().then((data) => setNetworks(data.data));
  }, []);

  return (
    <>
      {networks.map((network) => (
        <Network className="mt-3" key={network.id} network={network} />
      ))}
    </>
  );
};

export default NetworksWidget;
