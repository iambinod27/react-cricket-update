import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNewsDetail } from "@/store/actions/news/newsActions";
import { newsCleanUp } from "@/store/features/news/newsSlice";
import { RootState } from "@/store/store";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import kane from "../assets/images/kane.webp";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { photoCleanUp } from "@/store/features/photos/photosSlice";
import { v4 as uuidv4 } from "uuid";
import unixTimeConvert from "@/utils/dateConveter";

interface NewsDetailInterface {}

const NewsDetail: FC<NewsDetailInterface> = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { news, isLoading } = useAppSelector((state: RootState) => state.news);
  const { Photo } = useAppSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(getNewsDetail(params?.id));
    dispatch(photoCleanUp());
    dispatch(newsCleanUp());
  }, [params.id]);

  useEffect(() => {
    dispatch(getPhotos(news.coverImage?.id));
  }, [news.coverImage?.id]);

  const author = news.authors?.map((author: any) => author.name);

  console.log(news);

  // console.log(news.publishTime);

  const publishTime = unixTimeConvert(news.publishTime);

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="container mx-auto">
            <h2 className="text-[42px] font-[800] tracking-wide leading-[48px] text-[#333] ">
              {news.headline}
            </h2>
            <div className="flex items-baseline gap-[10px] my-[15px]">
              <p className="bg-[#398ac4] text-[#fff] inline p-[5px] rounded">
                {news.storyType}
              </p>
              <p className="capitalize">
                source:{" "}
                <span className="font-[700] leading-[0]">{news.source}</span>,
              </p>
            </div>
            <p className="italic">
              {news.context} , Published : {publishTime} by {author}
            </p>
            <p className="text-[20px] font-[400] leading-[32px]">
              {news.intro}
            </p>
            <div className="max-w-full relative mt-[15px]">
              {Photo ? (
                <>
                  <img src={Photo} alt={news.coverImage?.caption} />
                  <p className="absolute bottom-0  w-full bg-[#000000a9] px-[10px] py-[20px] text-[#fcfcfc] text-[16px]">
                    {news.coverImage?.caption} • {news.coverImage?.source}
                  </p>
                </>
              ) : (
                <img src={kane} alt={news.coverImage?.caption} />
              )}
            </div>
            <div className="py-[30px]">
              {news.content?.map((text) =>
                text.content != undefined ? (
                  <p
                    className="first:first-letter:text-[52px] text-[22px] [&:not(:last-child)]:mb-[20px] font-[500] leading-normal"
                    key={uuidv4()}
                  >
                    {text.content?.contentValue}
                  </p>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <DotPulse />
        </div>
      )}
    </div>
  );
};
export default NewsDetail;
