import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  getMatches,
  MatchStatus,
} from "@/store/actions/matches/matchesActions";
import { RootState } from "@/store/store";
import { FC, useEffect, useState } from "react";
import DotPulse from "@/components/Loading/DotPulse";
import Scorecard from "@/components/Scorecard";
import { Radio, Clock3, History, RefreshCw } from "lucide-react";
const statusTabs: { key: MatchStatus; label: string; icon: any }[] = [
  { key: "live", label: "Live", icon: Radio },
  { key: "upcoming", label: "Upcoming", icon: Clock3 },
  { key: "recent", label: "Recent", icon: History },
];

const Matches: FC = () => {
  const dispatch = useAppDispatch();
  const { live, recent, upcoming, isLoading } = useAppSelector(
    (state: RootState) => state.matches,
  );
  const [activeStatus, setActiveStatus] = useState<MatchStatus>("live");
  const [activeTypeTab, setActiveTypeTab] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const dataMap = { live, recent, upcoming };
  const matchesList = dataMap[activeStatus] ?? [];

  const handleRefresh = () => {
    // ✅ add this
    dispatch(getMatches("live"));
    setLastUpdated(new Date());
  };

  useEffect(() => {
    dispatch(getMatches(activeStatus));
    setActiveTypeTab(0);
  }, [dispatch, activeStatus]);

  useEffect(() => {
    if (activeStatus !== "live") return;
    const interval = setInterval(() => {
      dispatch(getMatches("live"));
    }, 30000);
    return () => clearInterval(interval);
  }, [activeStatus, dispatch]);

  const activeSeries = matchesList[activeTypeTab]?.seriesMatches?.filter(
    (m) => m.seriesAdWrapper !== undefined,
  );

  return (
    <div className="container mx-auto">
      {/* status tabs */}
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex gap-[10px]">
          {statusTabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveStatus(key)}
              className={`flex items-center gap-[6px] px-[18px] py-[10px] rounded-full text-[14px] font-[700] uppercase tracking-wide transition-colors ${
                activeStatus === key
                  ? "bg-[#c24a38] text-white"
                  : "bg-[#f0f0f0] text-[#666] hover:bg-[#e5e5e5]"
              }`}
            >
              <Icon
                size={15}
                className={
                  key === "live" && activeStatus === key ? "animate-pulse" : ""
                }
              />
              {label}
            </button>
          ))}
        </div>

        {activeStatus === "live" && (
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-[6px] text-[13px] text-[#666] hover:text-[#c24a38] disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            Refresh
            {lastUpdated && (
              <span className="text-[11px] text-[#aaa]">
                · updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[50vh]">
          <DotPulse />
        </div>
      ) : matchesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-[60px] text-[#999]">
          <p className="text-[15px]">No {activeStatus} matches right now</p>
        </div>
      ) : (
        <>
          {/* matchType sub-tabs, scoped to current status */}
          <div className="tabs justify-center w-full border-b border-[#eee]">
            {matchesList.map((m, index) => (
              <button
                key={m.matchType}
                onClick={() => setActiveTypeTab(index)}
                className={`px-5 py-3 text-[14px] font-[600] border-b-[3px] transition-colors ${
                  activeTypeTab === index
                    ? "border-[#c24a38] text-[#c24a38]"
                    : "border-transparent text-[#888] hover:text-[#333]"
                }`}
              >
                {m.matchType}
              </button>
            ))}
          </div>

          <div className="py-[30px]">
            {activeSeries && activeSeries.length > 0 ? (
              activeSeries.map((match) => (
                <div
                  key={match.seriesAdWrapper!.seriesId}
                  className="[&:not(:last-child)]:mb-[35px]"
                >
                  <h2 className="text-[22px] capitalize font-[700] px-[10px] mb-[12px]">
                    {match.seriesAdWrapper!.seriesName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                    {match.seriesAdWrapper!.matches.map((mat: any) => (
                      <Scorecard info={mat} key={mat.matchInfo.matchId} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#999] py-[40px]">
                No series found
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Matches;
