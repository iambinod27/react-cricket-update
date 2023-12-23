import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { getMatches } from "@/store/actions/matches/matchesActions";
import loading from "../assets/images/loading.gif";
import Scorecard from "@/components/Scorecard";
import { v4 as uuidv4 } from "uuid";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const { matchesList, isLoading } = useAppSelector(
    (state: RootState) => state.matches
  );

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  const international = !isLoading
    ? matchesList[0]?.seriesMatches?.filter((series) =>
        series.hasOwnProperty("seriesAdWrapper")
      )
    : [];

  console.log(matchesList);
  console.log(international.map((inter) => inter.matches));

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <>
          <div className="flex items-center justify-center w-full h-screen">
            <img src={loading} alt="Loading.." />
          </div>
        </>
      ) : (
        <>
          <h3 className="text-[30px] font-semibold">Games</h3>
          <ul className="flex gap-[15px]">
            {matchesList.map((matches) => (
              <li key={uuidv4()}>{matches.matchType}</li>
            ))}
          </ul>
          <div>
            {international.map((inter) => (
              <>
                <div key={inter.seriesId}>
                  hello
                  <h2>{inter.seriesName}</h2>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
