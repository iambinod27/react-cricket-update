// NewsDetail.tsx
import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNewsDetail } from "@/store/actions/news/newsActions";
import { newsCleanUp } from "@/store/features/news/newsSlice";
import { RootState } from "@/store/store";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import kane from "../assets/images/kane.webp";
import { getPhotos } from "@/store/actions/photos/photosActions";
import unixTimeConvert from "@/utils/dateConveter";
import { User, Calendar } from "lucide-react";

const NewsDetail: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { news, isLoading } = useAppSelector((state: RootState) => state.news);
  const { photos } = useAppSelector((state: RootState) => state.photos);
  const coverImageId = news.coverImage?.id;
  const Photo = coverImageId !== undefined ? photos[coverImageId] : undefined;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(getNewsDetail(params?.id));
    dispatch(newsCleanUp());
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    if (coverImageId && !Photo) {
      dispatch(getPhotos(coverImageId));
    }
  }, [coverImageId]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const authors = news.authors?.map((a) => a.name).join(", ");
  const publishTime = news.publishTime ? unixTimeConvert(news.publishTime) : "";

  return (
    <div>
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#c24a38] z-50 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      {!isLoading ? (
        <div className="container mx-auto max-w-[760px] px-4">
          <span className="inline-block px-[10px] py-[5px] text-[#fff] bg-[#05d78a] rounded text-[13px] font-[600] uppercase mb-[15px]">
            {news.storyType}
          </span>

          <h2 className="text-[38px] md:text-[46px] font-[800] tracking-tight leading-[1.15] text-[#1a1a1a]">
            {news.headline}
          </h2>

          <div className="flex flex-wrap items-center gap-[16px] text-[14px] text-[#666] mt-[16px] mb-[10px] pb-[16px] border-b border-[#eee]">
            {authors && (
              <span className="flex items-center gap-[6px]">
                <User size={14} /> {authors}
              </span>
            )}
            {publishTime && (
              <span className="flex items-center gap-[6px]">
                <Calendar size={14} /> {publishTime}
              </span>
            )}
            {news.source && (
              <span className="text-[#999]">
                Source: <span className="font-[600] text-[#333]">{news.source}</span>
              </span>
            )}
          </div>

          <p className="text-[19px] font-[400] leading-relaxed mt-[10px] font-poppins text-[#333] first-letter:text-[42px] first-letter:font-[800] first-letter:mr-[6px] first-letter:float-left first-letter:leading-none">
            {news.intro}
          </p>

          <div className="max-w-full relative mt-[24px] rounded-[12px] overflow-hidden">
            {Photo ? (
              <>
                <img src={Photo} alt={news.coverImage?.caption} className="w-full" />
                <p className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-[20px] py-[16px] text-[#fcfcfc] text-[13px]">
                  {news.coverImage?.caption} • {news.coverImage?.source}
                </p>
              </>
            ) : (
              <img src={kane} alt={news.coverImage?.caption ?? ""} className="w-full" />
            )}
          </div>

          <div className="py-[30px] max-w-[70ch]">
            {news.content?.map((text, i) =>
              text.content?.contentValue ? (
                <p
                  key={i}
                  className="text-[17px] [&:not(:last-child)]:mb-[22px] font-[400] leading-relaxed text-[#222]"
                >
                  {text.content.contentValue}
                </p>
              ) : null
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <DotPulse />
        </div>
      )}
    </div>
  );
};
export default NewsDetail;