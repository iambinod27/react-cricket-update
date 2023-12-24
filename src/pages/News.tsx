import NewsCard from "@/components/NewsCard";
import LoadingNewsCard from "@/components/Loading/NewsCard";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNews } from "@/store/actions/news/newsActions";
import { useEffect } from "react";

const News = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading } = useAppSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const newsStory = newsList.filter((news) => news.hasOwnProperty("story"));

  console.log(newsStory);
  return (
    <>
      <div>News</div>
      <div className="max-w-[992px]">
        {isLoading ? (
          Array.from({ length: 3 }, () => <LoadingNewsCard />)
        ) : (
          <>
            {newsStory.map((news) => (
              <NewsCard news={news} key={news.story.id} />
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default News;
