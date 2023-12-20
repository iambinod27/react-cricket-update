import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMatches } from "../store/action/matches/matchesActions";
import { FC, useEffect } from "react";
import { RootState } from "@/store/store";

interface typos {
  typeMatches: [];
}

const Home: FC<typos> = () => {
  const dispatch = useAppDispatch();
  const { matchesList, isLoading } = useAppSelector(
    (state: RootState) => state.matches
  );

  // console.log(matchesList.typeMatches);

  const matches: {} = matchesList;
  const typeMatches = matches.typeMatches;

  console.log(matches.typeMatches[0]);

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
        <ul className="flex gap-[10px]">
          {typeMatches.map((match: string, index) => {
            return (
              <>
                <li
                  className="cursor-pointer hover:underline text-[20px] font-[500] text-[#333]"
                  key={index}
                >
                  {match.matchType}
                </li>
              </>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default Home;
