import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getNewsDetail } from "@/store/actions/news/newsActions";
import { newsCleanUp } from "@/store/features/news/newsSlice";
import { RootState } from "@/store/store";
import convertMillisecondsToDate from "@/utils/dateConveter";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import kane from "../assets/images/kane.webp";

interface NewsDetailInterface {}

const NewsDetail: FC<NewsDetailInterface> = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { news, isLoading } = useAppSelector((state: RootState) => state.news);

  console.log(news);

  useEffect(() => {
    dispatch(getNewsDetail(params?.id));
    dispatch(newsCleanUp());
  }, [params.id]);
  console.log(news);

  //   console.log(ActualDate);

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="max-w-[1060px] mx-auto">
            <h2 className="text-[32px] font-[700] tracking-wide">
              {news.headline}
            </h2>
            <div className="flex items-baseline gap-[10px] my-[5px]">
              <p className="bg-[#398ac4] text-[#fff] inline p-[5px] rounded">
                {news.storyType}
              </p>
              <p className="capitalize">
                source:{" "}
                <span className="font-[700] leading-[0]">{news.source}</span>,
              </p>
            </div>
            <p>{news.intro}</p>
            <div className="max-w-[975px] my-[15px]">
              <img src={kane} alt={news.intro} />
            </div>
            <div></div>
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
