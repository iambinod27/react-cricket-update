import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMatches } from "../store/action/matches/matchesActions";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { matchesList } = useAppSelector((state) => state.matches);

  console.log(matchesList);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  return <div>Home</div>;
};
export default Home;
