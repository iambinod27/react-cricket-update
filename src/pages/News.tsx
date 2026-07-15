import NewsCard from "@/components/NewsCard";
import LoadingNewsCard from "@/components/Loading/NewsCard";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNews } from "@/store/actions/news/newsActions";
import { FC, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface NewsInterface {}

const News: FC<NewsInterface> = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading, nextIndex } = useAppSelector(
    (state: RootState) => state.news,
  );
  const observerRef = useRef<HTMLDivElement>(null);

  // GET NEWS
  useEffect(() => {
    dispatch(getNews(undefined));
  }, [dispatch]);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextIndex && !isLoading) {
          dispatch(getNews(nextIndex));
        }
      },
      { threshold: 1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [nextIndex, isLoading]);

  const newsStory = newsList.filter((news): news is NewsStoryItem =>
    news.hasOwnProperty("story"),
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="py-[30px]">
          {newsStory.map((news) => (
            <NewsCard
              news={news}
              key={news.story.id}
              image={news.story.coverImage?.id}
            />
          ))}
        </div>
        {isLoading && <LoadingNewsCard />}
        <div ref={observerRef} style={{ height: "1px" }} />
      </div>
    </>
  );
};
export default News;
