import { getMatches } from "../store/action/matches/matchesActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  return <div>Home</div>;
};
export default Home;
