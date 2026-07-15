import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Radio } from "lucide-react";

const NavList = [
  { title: "Scores", link: "/matches", live: true },
  { title: "News", link: "/news" },
  { title: "Ranking", link: "/ranking" },
];

const Nav = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "shadow-none border-b border-[#f0f0f0]"}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="font-[800] text-[22px] py-[16px]">
          Cric<span className="text-[#c24a38]">Up</span>
        </Link>

        <div className="hidden md:flex items-center text-[15px] uppercase font-[600] tracking-wide">
          {NavList.map((nav) => {
            const isActive = location.pathname.startsWith(nav.link);
            return (
              <Link
                to={nav.link}
                key={nav.link}
                className={`relative flex items-center gap-[6px] py-[20px] px-[16px] transition-colors ${isActive ? "text-[#c24a38]" : "text-[#333] hover:text-[#c24a38]"}`}
              >
                {nav.title}
                {nav.live && (
                  <span className="flex items-center gap-[3px] text-[10px] text-red-500 font-[700] normal-case">
                    <Radio size={10} className="animate-pulse" /> live
                  </span>
                )}
                {isActive && <span className="absolute left-[10px] right-[10px] bottom-0 h-[3px] bg-[#c24a38] rounded-full" />}
              </Link>
            );
          })}
        </div>

        <button className="md:hidden p-[8px]" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden flex flex-col border-t border-[#f0f0f0] px-4 py-[10px]">
          {NavList.map((nav) => {
            const isActive = location.pathname.startsWith(nav.link);
            return (
              <Link to={nav.link} key={nav.link} className={`py-[12px] text-[15px] font-[600] uppercase ${isActive ? "text-[#c24a38]" : "text-[#333]"}`}>
                {nav.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Nav;