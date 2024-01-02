import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMatches } from "@/store/actions/matches/matchesActions";
import { RootState } from "@/store/store";
import { FC, useEffect, useState } from "react";
import DotPulse from "@/components/Loading/DotPulse";
import Scorecard from "@/components/Scorecard";
import { v4 as uuidv4 } from "uuid";

interface MatchesProps {}

const Matches: FC<MatchesProps> = () => {
  const dispatch = useAppDispatch();
  const { matchesList, isLoading } = useAppSelector(
    (state: RootState) => state.matches
  );

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  console.log(matchesList);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <>
          <div className="flex items-center justify-center w-full h-screen">
            <DotPulse />
          </div>
        </>
      ) : (
        <>
          <h3 className="text-[30px] font-semibold">Games</h3>
          <div className="tabs justify-center w-full">
            {matchesList.map((matches, index) => (
              <div
                onClick={() => setActiveTab(index)}
                key={uuidv4()}
                className={`px-5 py-3 cursor-pointer border-b-[4px] transition-all ease-linear duration-150  border-2-[#333]${
                  activeTab === index
                    ? "tab-underline pb-3 border-b border-2-[#333] text-[#333] tab-active "
                    : ""
                }`}
              >
                {matches.matchType}
              </div>
            ))}
          </div>
          <div className="py-[50px]">
            {matchesList[activeTab]?.seriesMatches?.map((match) =>
              match.seriesAdWrapper != undefined ? (
                <div
                  key={match.seriesAdWrapper.seriesId}
                  className="[&:not(:last-child)]:mb-[20px]"
                >
                  <h2 className="text-[25px] capitalize font-[700] text-justify px-[10px] py-[10px]">
                    {match.seriesAdWrapper.seriesName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] p-5">
                    {match.seriesAdWrapper.matches.map((mat: any) => (
                      <Scorecard info={mat} key={mat.matchInfo.matchId} />
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Matches;
