import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import {
  getIccPlayerRaking,
  RankFormat,
  RankCategory,
} from "@/store/actions/ranking/rankingActions";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Trophy } from "lucide-react";

const RankAvatar = ({ imageID, name }: { imageID: number; name: string }) => {
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

const TrendIcon = ({ diff }: { diff?: string }) => {
  const val = Number(diff);
  if (!diff || isNaN(val) || val === 0)
    return <Minus size={16} className="text-[#999]" />;
  return val > 0 ? (
    <span className="flex items-center gap-[2px] text-green-600 text-sm font-medium">
      <TrendingUp size={16} /> {val}
    </span>
  ) : (
    <span className="flex items-center gap-[2px] text-red-500 text-sm font-medium">
      <TrendingDown size={16} /> {Math.abs(val)}
    </span>
  );
};

const medalStyles = [
  "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white",
  "bg-gradient-to-br from-gray-300 to-gray-400 text-white",
  "bg-gradient-to-br from-amber-600 to-amber-800 text-white",
];

const formats: RankFormat[] = ["test", "odi", "t20"];
const categories: { key: RankCategory; label: string }[] = [
  { key: "batsmen", label: "Batsmen" },
  { key: "bowlers", label: "Bowlers" },
];

const Ranking = () => {
  const dispatch = useAppDispatch();
  const { RankLoading, batsmen, bowlers } = useAppSelector(
    (state: RootState) => state.ranking
  );
  const [activeFormat, setActiveFormat] = useState<RankFormat>("test");
  const [activeCategory, setActiveCategory] = useState<RankCategory>("batsmen");

  useEffect(() => {
    dispatch(getIccPlayerRaking({ category: activeCategory, formatType: activeFormat }));
  }, [dispatch, activeCategory, activeFormat]);

  const rankList = (activeCategory === "batsmen" ? batsmen : bowlers).rank ?? [];
  const topThree = rankList.slice(0, 3);
  const rest = rankList.slice(3);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center gap-[10px] mb-[15px]">
        <Trophy className="text-yellow-500" />
        <h3 className="text-[28px] font-[700]">ICC Ranking</h3>
      </div>

      {/* category tabs */}
      <div className="flex gap-[10px] mb-[15px]">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`px-[16px] py-[8px] rounded-full text-[14px] font-[600] transition-colors ${
              activeCategory === c.key
                ? "bg-[#4685d8] text-white"
                : "bg-[#f0f0f0] text-[#666] hover:bg-[#e5e5e5]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* format tabs */}
      <div className="flex gap-[8px] mb-[25px] border-b border-[#e5e5e5]">
        {formats.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFormat(f)}
            className={`px-[18px] py-[10px] text-[15px] font-[600] uppercase border-b-2 transition-colors ${
              activeFormat === f
                ? "border-[#4685d8] text-[#4685d8]"
                : "border-transparent text-[#888] hover:text-[#333]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {RankLoading ? (
        <div className="min-h-[300px] w-full flex items-center justify-center">
          <DotPulse />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px] mb-[30px]">
            {topThree.map((player, i) => (
              <div
                key={player.id}
                className={`rounded-[16px] p-[18px] flex flex-col items-center text-center shadow-md ${medalStyles[i]}`}
              >
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-[3px] border-white mb-[10px]">
                  <RankAvatar imageID={player.faceImageId} name={player.name} />
                </div>
                <span className="text-[13px] font-[600] opacity-90">#{player.rank}</span>
                <span className="text-[17px] font-[700] leading-tight">{player.name}</span>
                <span className="text-[13px] opacity-90">{player.country}</span>
                <span className="mt-[6px] text-[22px] font-[800]">{player.points}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[12px] border border-[#eee] overflow-hidden">
            {rest.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-[15px] px-[18px] py-[12px] [&:not(:last-child)]:border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
              >
                <span className="w-[24px] text-[15px] font-[700] text-[#666]">{player.rank}</span>
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden shrink-0">
                  <RankAvatar imageID={player.faceImageId} name={player.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-[600] truncate">{player.name}</p>
                  <p className="text-[13px] text-[#999]">{player.country}</p>
                </div>
                <TrendIcon diff={player.diff} />
                <span className="w-[50px] text-right text-[16px] font-[700]">{player.points}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Ranking;