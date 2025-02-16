import NetworksWidget from "./Network/NetworksWidget";
import { mobileWidth } from "../lib/constants";
import NavbarSM from "./NavbarSM";
import Navbar from "./Navbar";

const Layout = ({ children, network }) => {
  return (
    <div className="position-relative">
      <Navbar network={network} />
      <div className="row mx-0 d-flex justify-content-center p-0 p-lg-3">
        <div className="d-none d-lg-block col-lg-2"></div>
        <div className="col-lg-5 p-0">{children}</div>
        <div className="col-lg-3 px-3 d-none d-lg-block position-relative">
          <NetworksWidget />
        </div>
        <div className="d-none d-lg-block col-lg-2"></div>
      </div>
      {window.innerWidth <= mobileWidth ? <NavbarSM network={network} /> : ""}
    </div>
  );
};

export default Layout;
