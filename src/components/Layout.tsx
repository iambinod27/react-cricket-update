import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.js";

const Layout = () => {
  return (
    <>
      <Nav />

      <div className="container mx-auto pt-[50px] ">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
export default Layout;
