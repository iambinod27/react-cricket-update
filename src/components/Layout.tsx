import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";

const Layout = () => {
  return (
    <>
      <Nav />

      <div className="container mx-auto font-rethink-sans">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
