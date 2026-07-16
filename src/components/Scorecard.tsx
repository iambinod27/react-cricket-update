import unixTimeConvert from "@/utils/dateConveter";
import { FC } from "react";
import { MapPin, Calendar } from "lucide-react";
import TeamLogo from "./TeamLogo";

interface Innings {
  overs: number;
  runs: number;
  wickets: number;
}

interface TeamScore {
  inngs1?: Innings;
  inngs2?: Innings;
}

interface ScorecardInterface {
  info: {
    matchInfo: {
      matchDesc: string;
      matchFormat: string;
      seriesName: string;
      venueInfo: { ground: string; city: string };
      team1: { teamSName: string; imageId: number };
      team2: { teamSName: string; imageId: number };
      status: string;
      startDate: number;
    };
    matchScore?: {
      team1Score?: TeamScore;
      team2Score?: TeamScore;
    };
  };
}

// renders one team's score line, works for limited-overs and test alike
const TeamScoreLine = ({
  name,
  score,
  isTest,
  imageID,
}: {
  name: string;
  score?: TeamScore;
  isTest: boolean;
  imageID?: number;
}) => {
  if (!score) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <TeamLogo imageID={imageID} />
          <p className="text-[18px] font-[700]">{name}</p>
        </div>
        <p className="font-[400] text-[16px] text-[#999]">Yet to bat</p>
      </div>
    );
  }

  const wicketsDisplay = (innings: Innings) =>
    innings.wickets !== undefined ? innings.wickets : "10";

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-[8px]">
        <TeamLogo imageID={imageID} />
        <p className="text-[18px] font-[700]">{name}</p>
      </div>
      <div className="flex items-baseline gap-[8px]">
        {isTest ? (
          <>
            {score.inngs1 && (
              <span className="text-[18px] font-[700]">
                {score.inngs1.runs}/{wicketsDisplay(score.inngs1)}
              </span>
            )}
            {score.inngs2 && (
              <>
                <span className="text-[13px] text-[#999]">&amp;</span>
                <span className="text-[18px] font-[700]">
                  {score.inngs2.runs}/{wicketsDisplay(score.inngs2)}
                </span>
              </>
            )}
          </>
        ) : (
          score.inngs1 && (
            <span className="text-[18px] font-[700] flex items-baseline gap-[5px]">
              <span className="text-[13px] font-[400] text-[#3f3f3f]">
                ({score.inngs1.overs} ov)
              </span>
              {score.inngs1.runs}/{wicketsDisplay(score.inngs1)}
            </span>
          )
        )}
      </div>
    </div>
  );
};

const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("live") || s.includes("need")) return "bg-red-500";
  if (s.includes("won") || s.includes("draw")) return "bg-[#4685d8]";
  return "bg-[#999]"; // scheduled / other
};

const Scorecard: FC<ScorecardInterface> = ({ info }) => {
  const isTest = info.matchInfo.matchFormat === "TEST";
  const isLive = info.matchInfo.status.toLowerCase().includes("live");

  return (
    <div className="shadow-lg bg-white text-[#222] rounded-[12px] p-[16px] border border-[#e6e6e6] hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-[10px]">
        <div>
          <p className="uppercase text-[13px] font-[700] text-[#4685d8] tracking-wide">
            {info.matchInfo.matchFormat}
          </p>
          <p className="capitalize text-[14px] font-[500] mt-[2px]">
            {info.matchInfo.matchDesc}, {info.matchInfo.seriesName}
          </p>
        </div>
        {isLive && (
          <span className="flex items-center gap-[5px] text-[12px] font-[700] text-red-500">
            <span className="w-[7px] h-[7px] rounded-full bg-red-500 animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center gap-[10px] text-[12px] text-[#888] mb-[14px]">
        <span className="flex items-center gap-[4px]">
          <MapPin size={12} />
          {info.matchInfo.venueInfo.ground}, {info.matchInfo.venueInfo.city}
        </span>
        <span className="flex items-center gap-[4px]">
          <Calendar size={12} />
          {unixTimeConvert(info.matchInfo.startDate)}
        </span>
      </div>

      <div className="flex flex-col gap-[8px] py-[8px] border-y border-[#f0f0f0]">
        <TeamScoreLine
          name={info.matchInfo.team1.teamSName}
          score={info.matchScore?.team1Score}
          isTest={isTest}
          imageID={info.matchInfo.team1.imageId}
        />
        <TeamScoreLine
          name={info.matchInfo.team2.teamSName}
          score={info.matchScore?.team2Score}
          isTest={isTest}
          imageID={info.matchInfo.team2.imageId}
        />
      </div>

      <div className="flex items-center gap-[8px] mt-[10px]">
        <span
          className={`w-[6px] h-[6px] rounded-full ${statusColor(info.matchInfo.status)}`}
        />
        <p className="text-[13px] font-[500] capitalize text-[#444]">
          {info.matchInfo.status}
        </p>
      </div>
    </div>
  );
};
export default Scorecard;
