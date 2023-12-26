const Scorecard = ({ info }) => {
  return (
    <>
      <div className=" shadow-lg bg-white text-[#222] rounded-lg p-[10px] border-[1px] border-[#e6e6e6]">
        <div className="flex gap-[5px] border-b-[#6e6e6e] items-baseline">
          <p className="uppercase text-[15px] font-bold">Result</p>
          <p className="capitalize text-[14px] font-[500]">
            {info.matchInfo.matchFormat}
          </p>
          <p className="capitalize text-[12px] font-[400]">
            {info.matchInfo.venueInfo.ground}, {info.matchInfo.venueInfo.city}
          </p>
        </div>
        <div className="py-[5px]">
          <div className="flex justify-between">
            <p className="text-[18px] font-[700]">
              {info.matchInfo.team1.teamSName}
            </p>
            <p className="text-[18px] font-[700]">
              <span className="text-[13px] font-[400] text-[#3f3f3f]">
                (45.5ov . T:297)
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[18px] font-[700]">
              {info.matchInfo.team2.teamSName}
            </p>
            <p className="text-[18px] font-[700]">
              {/* <span className="text-[13px] font-[400] text-[#3f3f3f]">
                ({info.matchScore.team2Score.inngs1.overs})
              </span>
              {info.matchScore.team2Score?.inngs1.runs}/
              {info.matchScore.team2Score?.inngs1?.wickets} */}
            </p>
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
