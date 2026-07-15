import NewsCard from "@/components/NewsCard";
import LoadingNewsCard from "@/components/Loading/NewsCard";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNews } from "@/store/actions/news/newsActions";
import { FC, useEffect, useRef } from "react";
import { NewsStoryItem } from "@/types/news";
import { Newspaper } from "lucide-react";

interface NewsInterface {}

const News: FC<NewsInterface> = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading, nextIndex } = useAppSelector(
    (state: RootState) => state.news
  );
  const observerRef = useRef<HTMLDivElement>(null);

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
      { threshold: 1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [nextIndex, isLoading]);

  const newsStory = newsList.filter(
    (news): news is NewsStoryItem => news.hasOwnProperty("story")
  );

  const isInitialLoad = isLoading && newsStory.length === 0;

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-[10px] mb-[5px]">
        <Newspaper className="text-[#c24a38]" size={26} />
        <h2 className="text-[30px] font-[800] text-[#1a1a1a]">Latest Headlines</h2>
      </div>
      <p className="text-[14px] text-[#888] mb-[20px]">
        Fresh from the cricket world, as it happens
      </p>

      <div className="pb-[30px]">
        {isInitialLoad ? (
          <div className="flex flex-col gap-[30px]">
            {Array.from({ length: 3 }, (_, i) => (
              <LoadingNewsCard key={i} />
            ))}
          </div>
        ) : newsStory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[60px] text-[#999]">
            <Newspaper size={40} className="mb-[10px] opacity-30" />
            <p className="text-[15px]">No news available right now</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              {newsStory.map((news, i) => (
                <div
                  key={news.story.id}
                  className="animate-[fadeIn_0.4s_ease-in-out] [&:not(:last-child)]:mb-[40px]"
                  style={{ animationDelay: `${(i % 6) * 60}ms`, animationFillMode: "backwards" }}
                >
                  <NewsCard news={news} image={news.story.coverImage?.id ?? 0} />
                </div>
              ))}
            </div>
            {isLoading && (
              <div className="flex justify-center py-[20px]">
                <LoadingNewsCard />
              </div>
            )}
          </>
        )}
      </div>

      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};
export default News;