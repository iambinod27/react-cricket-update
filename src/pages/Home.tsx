import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMatches } from "../store/action/matches/matchesActions";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const { matchesList, isLoading } = useAppSelector(
    (state: RootState) => state.matches
  );

  console.log(matchesList.typeMatches);

  const matches: Array[] = matchesList.typeMatches;

  console.log(matches);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <div>
          {matches.map((match: string) => {
            const seriesMatches = match.seriesMatches;
            console.log(seriesMatches);
            return (
              <>
                <h3>{match.matchType}</h3>
                {/* <div>
                  {seriesMatches.map((series) => {
                    return <p>{series.seriesAdWrapper.seriesName}</p>;
                  })}
                </div> */}
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Home;
