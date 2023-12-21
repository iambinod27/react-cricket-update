import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { getMovies } from "@/store/actions/movies/moviesActions";
import MoviesCard from "@/components/MoviesCard";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const { moviesList, isLoading } = useAppSelector(
    (state: RootState) => state.movies
  );

  console.log(moviesList);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <>loading...</>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-[10px]">
            {moviesList.map((movie) => (
              <MoviesCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
