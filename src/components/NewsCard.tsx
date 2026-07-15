// NewsCard.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import NewsImage from "./NewsImage";
import unixTimeConvert from "@/utils/dateConveter";
import { ArrowRight, Clock } from "lucide-react";

interface CoverImage {
  id: number;
  caption?: string;
}

interface Story {
  hline: string;
  intro: string;
  source: string;
  context: string;
  storyType: string;
  coverImage?: CoverImage;
  id: number;
  pubTime: number;
}

interface News {
  story: Story;
}

interface NewsCardInterface {
  news: News;
  image: number;
}

// color per story type — falls back to a neutral badge for unknown types
const storyTypeColors: Record<string, string> = {
  news: "bg-[#4685d8]",
  feature: "bg-[#05d78a]",
  interview: "bg-[#f0973b]",
  editorial: "bg-[#a259e6]",
};

const NewsCard: FC<NewsCardInterface> = ({ news, image }) => {
  const badgeColor =
    storyTypeColors[news.story.storyType?.toLowerCase()] ?? "bg-[#6e6e6e]";

  return (
    <Link
      to={`/newsdetail/${news.story.id}`}
      className="group relative block bg-white rounded-[12px] border border-[#e5e5e5] p-4  shadow-sm hover:shadow-xl hover:-translate-y-[3px] transition-all duration-300 "
    >
      <div className="flex items-center gap-[10px] mb-[15px]">
        <span
          className={`px-[10px] py-[4px] text-[#fff] rounded-full text-[12px] font-[600] uppercase tracking-wide ${badgeColor}`}
        >
          {news.story.storyType}
        </span>
        <span className="text-[13px] font-[400] font-poppins text-[#6e6e6e]">
          {news.story.context}
        </span>
        <span className="flex items-center gap-[4px] text-[13px] text-[#999] ml-auto">
          <Clock size={13} />
          {unixTimeConvert(news.story.pubTime)}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-[20px] items-start">
        <div className="max-w-[340px] w-full aspect-[16/10] shrink-0">
          <NewsImage imageID={image} headline={news.story.hline} />
        </div>

        <div className="px-[10px] max-w-full w-full">
          <h3 className="text-[26px] font-[700] mb-[10px] leading-tight line-clamp-2 group-hover:text-[#4685d8] transition-colors">
            {news.story.hline}
          </h3>
          <p className="line-clamp-2 lg:line-clamp-3 text-[14px] font-[300] leading-relaxed font-poppins text-[#444]">
            {news.story.intro}
          </p>

          <div className="flex items-center justify-between mt-[14px]">
            <p className="text-[13px] text-[#888]">
              Source: <span className="font-[600] text-[#333]">{news.story.source}</span>
            </p>
            <span className="flex items-center gap-[4px] text-[13px] font-[600] text-[#4685d8] opacity-0 group-hover:opacity-100 transition-opacity">
              Read more <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NewsCard;