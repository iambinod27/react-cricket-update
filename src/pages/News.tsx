import NewsCard from "@/components/NewsCard";
import LoadingNewsCard from "@/components/Loading/NewsCard";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNews } from "@/store/actions/news/newsActions";
import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface NewsInterface {}

const News: FC<NewsInterface> = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading } = useAppSelector(
    (state: RootState) => state.news
  );

  // GET NEWS
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const newsStory = newsList.filter((news) => news.hasOwnProperty("story"));

  const ImagesIds = newsStory.map((image) => image.story?.coverImage?.id);
  console.log(ImagesIds);

  return (
    <>
      <div className="container mx-auto">
        {isLoading ? (
          Array.from({ length: 3 }, () => <LoadingNewsCard key={uuidv4()} />)
        ) : (
          <>
            <div className="py-[30px]">
              {newsStory.map((news: any, index) => (
                <NewsCard
                  news={news}
                  key={news.story.id}
                  image={ImagesIds[index]}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default News;
