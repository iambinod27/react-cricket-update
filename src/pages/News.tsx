import NewsCard from "@/components/NewsCard";
import LoadingNewsCard from "@/components/Loading/NewsCard";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNews } from "@/store/actions/news/newsActions";
import { FC, useEffect } from "react";

interface NewsInterface {}

const News: FC<NewsInterface> = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading } = useAppSelector(
    (state: RootState) => state.news
  );

  const newsStory = newsList.filter((news) => news.hasOwnProperty("story"));
  // console.log(newsStory);

  // GET NEWS
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <>
      <h2 className="font-[700] text-[55px] pb-[15px] border-b border-b-[#515151] mb-[30px]">
        News
      </h2>
      <div className="max-w-[992px] mx-auto">
        {isLoading ? (
          Array.from({ length: 3 }, () => <LoadingNewsCard />)
        ) : (
          <>
            {newsStory.map((news: any) => (
              <NewsCard news={news} key={news.story.id} />
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default News;
