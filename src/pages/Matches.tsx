import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMatches } from "@/store/actions/matches/matchesActions";
import { RootState } from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import { FC, useEffect, useState } from "react";
import DotPulse from "@/components/Loading/DotPulse";

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

  // matchesList.map((match) => match.seriesMatches).map(inrArr => inrArr).map(filterName => filterName).map(a => console.log(a));

  console.log(matchesList.map(match => match));
  // console.log(matchesList.map(match => match.seriesMatches).map(seriesMatch => console.log(seriesMatch.seriesAdWrapper)));
  // let realMatchList:object[] = [];

  // const matchList =  matchesList.map(match => match.seriesMatches);
  // // console.log(matchList);

  // matchList.forEach(inrArr => {
  //   inrArr.forEach(seriesAd => {
  //     if(seriesAd.seriesAdWrapper != undefined) {
  //       realMatchList.push(seriesAd.seriesAdWrapper);
  //     }
  //   });
  // });

  // console.log(realMatchList);

  // let data = matchList.map
  // const newsAddWrapper = matchList.map(inrArr => inrArr);

  // console.log(newsAddWrapper);

  // console.log( const newsStory = newsList.filter((news) => news.hasOwnProperty("story"));)

  // console.log(matchesList);

  // console.log(matchesList.filter(match => match.seriesMatches)))

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
                className={`px-5 py-3 cursor-pointer border-b-[4px] transition-all ease-linear duration-150  border-2-[#333]${
                  activeTab === index
                    ? "tab-underline pb-3 border-b border-2-[#333] text-[#333] tab-active "
                    : ""
                }`}
                key={uuidv4()}
              >
                {matches.matchType}
              </div>
            ))}
          </div>
          <div>
            {matchesList[activeTab]?.seriesMatches?.map((match) => ((match.seriesAdWrapper != undefined ? <div key={uuidv4()}>{match.seriesAdWrapper.seriesName}</div> : "")
              // return (<div key={uuidv4()}>
              //   {/* <p>{console.log(match.seriesId)}</p> */}
              //   {(match.seriesAdWrapper != undefined &&  )? match.seriesAdWrapper.seriesName : ""}
              //   {/* Render content for each match */}
              // </div>);
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Matches;
