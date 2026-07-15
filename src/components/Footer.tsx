import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Trophy } from "lucide-react";

const quickLinks = [
  { title: "Live Scores", link: "/matches" },
  { title: "News", link: "/news" },
  { title: "Ranking", link: "/ranking" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1a1a1a] text-[#ccc] mt-[60px]">
      <div className="container mx-auto px-4 py-[50px] grid grid-cols-1 md:grid-cols-3 gap-[40px]">
        <div>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <Trophy className="text-[#c24a38]" size={22} />
            <span className="font-[800] text-[22px] text-white">Cric<span className="text-[#c24a38]">Up</span></span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#999] max-w-[280px]">
            Live scores, breaking news, and player rankings — all in one place.
          </p>
        </div>
        <div>
          <h4 className="text-white text-[15px] font-[700] uppercase tracking-wide mb-[16px]">Quick Links</h4>
          <div className="flex flex-col gap-[10px]">
            {quickLinks.map((l) => (
              <Link key={l.link} to={l.link} className="text-[14px] text-[#999] hover:text-[#c24a38] transition-colors">
                {l.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white text-[15px] font-[700] uppercase tracking-wide mb-[16px]">Connect</h4>
          <div className="flex gap-[14px]">
            <a href="https://github.com/iambinod27" target="_blank" rel="noopener noreferrer" className="p-[8px] rounded-full bg-[#2a2a2a] hover:bg-[#c24a38] transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-[8px] rounded-full bg-[#2a2a2a] hover:bg-[#c24a38] transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:you@example.com" className="p-[8px] rounded-full bg-[#2a2a2a] hover:bg-[#c24a38] transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2a2a2a] py-[18px]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-[8px] text-[12px] text-[#777]">
          <p>© {year} CricUp. Built by Binod.</p>
          <p>Cricket data powered by Cricbuzz</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;