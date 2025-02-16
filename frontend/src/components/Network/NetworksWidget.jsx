import { useEffect, useState } from "react";
import api from "../../api";
import Network from "./Network";
import CreateNetwork from "./CreateNetwork";

const NetworksWidget = ({ className }) => {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const getNetworks = async () => {
      const response = await api.get("networks/");
      return response.data;
    };

    getNetworks().then((data) => setNetworks(data.data));
  }, []);

  return (
    <>
      <div className={`bg-primary border p-3 rounded-3 shadow-sm ${className}`}>
        <div className="d-flex align-items-center">
          <span className="me-auto">Networks</span>
          <CreateNetwork className="bg-secondary" />
        </div>
        {networks.map((network) => (
          <Network className="mt-3" key={network.id} network={network} />
        ))}
      </div>
    </>
  );
};

export default NetworksWidget;
