import { FC } from "react";
import NewsImage from "../assets/images/ind-vs-sa.png";

interface NewsCardInterface {
  news: {
    story: {
      hline: string;
      intro: string;
      id: number;
      source: string;
      context: string;
    };
  };
}

const NewsCard: FC<NewsCardInterface> = ({ news }) => {
  console.log(news);
  return (
    <>
      <div className="p-4 border border-[#d7d7d7] drop-shadow-md mb-9 bg-[#fff]">
        <div className="mb-[15px]">
          <span className="px-[10px] py-[5px] text-[#fff] bg-[#4685d8] rounded mr-[10px] text-[15px] font-[500]">
            Axed
          </span>
          <span className="text-[15px] font-[500]">{news.story.context}</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-[20px] ">
          <div className="max-w-[400px] mx-auto">
            <img
              src={NewsImage}
              alt="Jayed didn't get an opportunity in New Zealand and South Africa as well."
            />
          </div>
          <div className="p-[10px]">
            <h3 className="text-[30px] font-semibold mb-[10px] leading-normal">
              {news.story.hline}
            </h3>
            <p className="line-clamp-2 lg:line-clamp-3 text-[20px] font-[400] leading-normal">
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
