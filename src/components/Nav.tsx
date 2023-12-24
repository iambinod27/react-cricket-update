import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Nav = () => {
  const NavList = [
    { title: "Matches", link: "/matches" },
    { title: "News", link: "/news" },
    { title: "Players", link: "/players" },
    { title: "Ranking", link: "/ranking" },
    { title: "Teams", link: "/teams" },
  ];

  return (
    <>
      <div className="navbar navbar-sticky navbar-glass py-0 bg-[#fff]">
        <div className="navbar-start">
          <Link to="/" className="font-[600] text-[20px]">
            <p className="navbar-item">CricUp</p>
          </Link>
        </div>
        <div className="navbar-end text-[16px] uppercase font-[500]">
          {NavList.map((navL) => (
            <Link
              to={navL.link}
              key={uuidv4()}
              className="border-b-2 border-b-white rounded-none hover:border-b-black py-[20px] px-[0.75rem]"
            >
              <p className="navbar-item">{navL.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default Nav;
