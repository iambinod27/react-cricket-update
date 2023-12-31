const PlayerCard = () => {
  return (
    <div className="border shadow-lg  rounded-[20px] overflow-hidden animate-pulse ">
      <div className="mb-[10px] min-h-[300px] flex items-center w-full bg-slate-300"></div>
      <div className="p-[15px]">
        <p className="text-[24px] h-[32px] leading-[32px] font-[600] w-full bg-slate-300 rounded"></p>
        <p className="text-[18px] h-[25px] font-[400] bg-slate-300 w-1/2 mt-[10px] rounded"></p>
      </div>
    </div>
  );
};
export default PlayerCard;
