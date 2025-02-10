import NavbarSM from "../components/NavbarSM";
import CreateNetwork from "../components/Network/CreateNetwork";
import NetworksWidget from "../components/Network/NetworksWidget";
import CreateBtn from "../components/Post/CreateBtn";
import { mobileWidth } from "../lib/constants";

const CreatePage = ({}) => {
  return (
    <>
      <div className="row mx-0 p-lg-3 h-100">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 h-100 p-3">
          <div className="rounded-3">
            <CreateBtn className="bg-primary w-100 mb-3" />
            <CreateNetwork className="bg-primary w-100 mb-3" />
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
    </>
  );
};

export default CreatePage;
