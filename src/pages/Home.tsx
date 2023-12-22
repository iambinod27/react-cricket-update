import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { getMatches } from "@/store/actions/matches/matchesActions";
import loading from "../assets/images/loading.gif";
import Scorecard from "@/components/Scorecard";
import { uuid } from "uuidv4";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const { matchesList, isLoading } = useAppSelector(
    (state: RootState) => state.matches
  );

  console.log(matchesList);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

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
              <li>{matches.matchType}</li>
            ))}
          </ul>
          <Scorecard />
        </>
      )}
    </div>
  );
};

export default Home;
