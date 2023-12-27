import { FC } from "react";

interface ScorecardInterface {
  info: {
    matchInfo: {
      matchFormat: string;
      venueInfo: {
        ground: string;
        city: string;
      };
      team1: {
        teamSName: string;
      };
      team2: {
        teamSName: string;
      };
      status: string;
    };
    matchScore: {
      team1Score: {
        inngs1: {
          overs: number;
          runs: number;
          wickets: number;
        };
        inngs2: {
          overs: number;
          runs: number;
          wickets: number;
        };
      };
      team2Score: {
        inngs1: {
          overs: number;
          runs: number;
          wickets: number;
        };
        inngs2: {
          overs: number;
          runs: number;
          wickets: number;
        };
      };
    };
  };
}

const Scorecard: FC<ScorecardInterface> = ({ info }) => {
  return (
    <>
      <div className=" shadow-lg bg-white text-[#222] rounded-lg p-[10px] border-[1px] border-[#e6e6e6]">
        <div className="flex gap-[5px] border-b-[#6e6e6e] items-baseline flex-col">
          <p className="uppercase text-[15px] font-bold">Result</p>
          <div className="flex align-center gap-[5px]">
            <p className="capitalize text-[14px] font-[500]">
              {info.matchInfo.matchFormat}
            </p>
            <p className="capitalize text-[12px] font-[400] leading-[21px]">
              {info.matchInfo.venueInfo.ground}, {info.matchInfo.venueInfo.city}
            </p>
          </div>
        </div>
        <div className="py-[5px]">
          <div className="flex justify-between">
            <p className="text-[18px] font-[700]">
              {info.matchInfo.team1.teamSName}
            </p>

            {info.matchScore != undefined ? (
              info.matchInfo.matchFormat != "TEST" ? (
                <p className="text-[18px] font-[700] flex items-baseline gap-[5px]">
                  <span className="text-[13px] font-[400] text-[#3f3f3f]">
                    ({info.matchScore?.team1Score?.inngs1.overs} ov)
                  </span>
                  {info.matchScore?.team1Score?.inngs1.runs}/
                  {info.matchScore?.team1Score?.inngs1?.wickets}
                </p>
              ) : (
                <>
                  <div className="flex gap-[5px]">
                    <p className="text-[18px] font-[700] flex items-baseline gap-[5px]">
                      {info.matchScore?.team1Score?.inngs1?.runs}/
                      {info.matchScore?.team1Score?.inngs1?.wickets}
                    </p>
                    {info.matchScore.team1Score.inngs2 != undefined ? (
                      <>
                        &
                        <p className="text-[18px] font-[700] flex items-baseline gap-[5px]">
                          {info.matchScore?.team1Score?.inngs2?.runs}/
                          {info.matchScore?.team1Score?.inngs2?.wickets}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )
            ) : (
              <p className="font-[400] text-[18px]">N/A</p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-[18px] font-[700]">
              {info.matchInfo.team2.teamSName}
            </p>
            {info.matchScore != undefined ? (
              info.matchInfo.matchFormat != "TEST" ? (
                <p className="text-[18px] font-[700] flex items-baseline gap-[5px]">
                  <span className="text-[13px] font-[400] text-[#3f3f3f]">
                    ({info.matchScore?.team2Score?.inngs1.overs} ov)
                  </span>
                  {info.matchScore?.team2Score?.inngs1.runs}/
                  {info.matchScore?.team2Score?.inngs1?.wickets}
                </p>
              ) : (
                <>
                  <div className="flex gap-[5px]">
                    {info.matchScore.team2Score != undefined ? (
                      <p className="text-[18px] font-[700] flex items-baseline gap-[5px]">
                        {info.matchScore?.team2Score?.inngs1.runs}/
                        {info.matchScore?.team2Score?.inngs1?.wickets}
                      </p>
                    ) : (
                      <p className="font-[400] text-[18px]">N/A</p>
                    )}
                    {info.matchScore.team2Score.inngs2 != undefined ? (
                      <>
                        &
                        <p className="text-[18px] font-[700] flex items-baseline gap-[5px]">
                          {info.matchScore?.team2Score?.inngs2?.runs}/
                          {info.matchScore?.team2Score?.inngs2?.wickets}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )
            ) : (
              <p className="font-[400] text-[18px]">N/A</p>
            )}
          </div>
        </div>
        <p className="text-[13px] font-[400] capitalize">
          {info.matchInfo.status}
        </p>
      </div>
    </>
  );
};
export default Scorecard;
