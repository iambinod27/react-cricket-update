import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";
import { getPhotos } from "@/store/actions/photos/photosActions";
import DotPulse from "./Loading/DotPulse";
import { Link } from "react-router-dom";

interface News {
  story: {
    hline: string;
    intro: string;
    source: string;
    context: string;
    storyType: string;
    imageId: string;
    id: number;
  };
}

interface NewsCardInterface {
  news: News;
}

const NewsCard: FC<NewsCardInterface> = ({ news }) => {
  const dispatch = useAppDispatch();
  const { Photo } = useAppSelector((state: RootState) => state.photos);

  const imageID = news.story.imageId;
  // console.log(`photos :${imageID}`);

  // console.log("photos");

  useEffect(() => {
    dispatch(getPhotos(imageID));
  }, [imageID]);

  return (
    <>
      <div className="p-4 border border-[#d7d7d7] drop-shadow-md [&:not(:last-child)]:mb-[20px] bg-[#fff] ">
        <div className="mb-[15px]">
          <span className="px-[10px] py-[5px] text-[#fff] bg-[#4685d8] rounded mr-[10px] text-[15px] font-[500]">
            {news.story.storyType}
          </span>
          <span className="text-[15px] font-[600]">{news.story.context}</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-[20px] items-start">
          <div className="max-w-[220px] w-full mx-auto">
            {Photo ? (
              <img
                src={Photo}
                alt={news.story.hline}
                className="object-cover w-full"
              />
            ) : (
              <div className="flex items-center justify-center">
                <DotPulse />
              </div>
            )}
          </div>
          <div className="px-[10px] max-w-[718px] w-full">
            <h3 className="text-[36px] font-semibold mb-[10px] leading-[38px]">
              <Link to={`/newsdetail/${news.story.id}`}>
                {news.story.hline}
              </Link>
            </h3>
            <p className="line-clamp-2 lg:line-clamp-3 text-[20px] font-[400] leading-[26px]">
              {news.story.intro}
            </p>
          </div>
        </div>
        <p className="text-[14px] mt-[10px]">
          Source : <span className="font-[600]">{news.story.source}</span>
        </p>
      </div>
    </>
  );
};
export default NewsCard;
