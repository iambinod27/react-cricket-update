import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMatches } from "@/store/actions/matches/matchesActions";
import { getNews } from "@/store/actions/news/newsActions";
import { getIccPlayerRaking } from "@/store/actions/ranking/rankingActions";
import { getPhotos } from "@/store/actions/photos/photosActions";
import Scorecard from "@/components/Scorecard";
import NewsCard from "@/components/NewsCard";
import DotPulse from "@/components/Loading/DotPulse";
import { Radio, Newspaper, Trophy, ArrowRight } from "lucide-react";
import { NewsStoryItem } from "@/types/news";

const RankAvatarMini = ({ imageID, name }: { imageID: number; name: string }) => {
  const dispatch = useAppDispatch();
  const { photos } = useAppSelector((state: RootState) => state.photos);
  const Photo = photos[imageID];

  useEffect(() => {
    if (!Photo && imageID) dispatch(getPhotos(imageID));
  }, [imageID]);

  return Photo ? (
    <img src={Photo} alt={name} className="w-full h-full object-cover" />
  ) : (
    <div className="w-full h-full bg-[#e5e5e5] flex items-center justify-center text-[#999] text-sm font-semibold">
      {name.charAt(0)}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, to }: { icon: any; title: string; to: string }) => (
  <div className="flex items-center justify-between mb-[16px]">
    <div className="flex items-center gap-[8px]">
      <Icon className="text-[#c24a38]" size={22} />
      <h3 className="text-[22px] font-[800]">{title}</h3>
    </div>
    <Link to={to} className="flex items-center gap-[4px] text-[13px] font-[600] text-[#c24a38] hover:underline">
      View all <ArrowRight size={14} />
    </Link>
  </div>
);

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { live } = useAppSelector((s: RootState) => s.matches);
  const { newsList } = useAppSelector((s: RootState) => s.news);
  const { batsmen } = useAppSelector((s: RootState) => s.ranking);

  useEffect(() => {
    dispatch(getMatches("live"));
    dispatch(getNews(undefined));
    dispatch(getIccPlayerRaking({ category: "batsmen", formatType: "test" }));
  }, [dispatch]);

  const liveSeries = live
    .flatMap((m) => m.seriesMatches)
    .filter((m) => m.seriesAdWrapper !== undefined)
    .slice(0, 2);

  const newsStory = newsList
    .filter((n): n is NewsStoryItem => n.hasOwnProperty("story"))
    .slice(0, 3);

  const topBatsmen = (batsmen.rank ?? []).slice(0, 3);

  return (
    <div className="container mx-auto">
      {/* hero */}
      <div className="py-[60px] text-center">
        <h1 className="text-[42px] md:text-[56px] font-[900] leading-tight">
          Every run. Every wicket. <br />
          <span className="text-[#c24a38]">Real time.</span>
        </h1>
        <p className="text-[16px] text-[#888] mt-[14px] max-w-[480px] mx-auto">
          Live scores, breaking news, and player rankings for cricket fans who don't miss a moment.
        </p>
        <div className="flex items-center justify-center gap-[12px] mt-[24px]">
          <Link to="/matches" className="px-[24px] py-[12px] bg-[#c24a38] text-white rounded-full font-[700] text-[14px] hover:bg-[#a83e2f] transition-colors">
            Watch Live Scores
          </Link>
          <Link to="/news" className="px-[24px] py-[12px] border border-[#ddd] rounded-full font-[700] text-[14px] hover:border-[#c24a38] hover:text-[#c24a38] transition-colors">
            Latest News
          </Link>
        </div>
      </div>

      {/* live matches */}
      <div className="mb-[50px]">
        <SectionHeader icon={Radio} title="Live Now" to="/matches" />
        {liveSeries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {liveSeries.flatMap((s) =>
              s.seriesAdWrapper!.matches.slice(0, 2).map((mat: any) => (
                <Scorecard info={mat} key={mat.matchInfo.matchId} />
              ))
            )}
          </div>
        ) : (
          <p className="text-[14px] text-[#999] py-[20px]">No live matches right now — check back soon.</p>
        )}
      </div>

      {/* latest news */}
      <div className="mb-[50px]">
        <SectionHeader icon={Newspaper} title="Latest Headlines" to="/news" />
        {newsStory.length > 0 ? (
          <div className="flex flex-col">
            {newsStory.map((news) => (
              <NewsCard news={news} key={news.story.id} image={news.story.coverImage?.id ?? 0} />
            ))}
          </div>
        ) : (
          <div className="py-[20px] flex justify-center"><DotPulse /></div>
        )}
      </div>

      {/* top ranking */}
      <div className="mb-[50px]">
        <SectionHeader icon={Trophy} title="Top Batsmen (Test)" to="/ranking" />
        {topBatsmen.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px]">
            {topBatsmen.map((p: any) => (
              <div key={p.id} className="flex items-center gap-[12px] p-[14px] border border-[#eee] rounded-[12px]">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0">
                  <RankAvatarMini imageID={p.faceImageId} name={p.name} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-[#999]">#{p.rank}</p>
                  <p className="text-[15px] font-[700] truncate">{p.name}</p>
                  <p className="text-[13px] text-[#666]">{p.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-[20px] flex justify-center"><DotPulse /></div>
        )}
      </div>
    </div>
  );
};
export default Home;