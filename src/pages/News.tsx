import NewsCard from "@/components/NewsCard";
import LoadingNewsCard from "@/components/Loading/NewsCard";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNews } from "@/store/actions/news/newsActions";
import { FC, useEffect } from "react";
import { getPhotos } from "@/store/actions/photos/photosActions";

interface NewsInterface {}

const News: FC<NewsInterface> = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading } = useAppSelector(
    (state: RootState) => state.news
  );

  const { Photo } = useAppSelector((state: RootState) => state.photos);

  const newsStory = newsList.filter((news) => news.hasOwnProperty("story"));
  console.log(newsStory);

  // GET NEWS
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  // function getImage() => {
  //   news.map
  // }

  // GET PHOTOS
  // useEffect(() => {
  //   dispatch(getPhotos());
  // }, []);

  console.log(Photo);
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
            {newsStory.map((news, index) => (
              <NewsCard news={news} key={news.story.id} image="" />
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default News;
