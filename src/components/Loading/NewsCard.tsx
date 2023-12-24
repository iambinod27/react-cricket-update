const NewsCard = () => {
  return (
    <div className="p-4 border border-[#d7d7d7] drop-shadow-md bg-[#fff] mb-[30px]">
      <div className="flex flex-col lg:flex-row gap-[20px] animate-pulse ">
        <div className="max-w-[400px] w-full h-[225px] bg-slate-300 rounded"></div>
        <div className="p-[10px] max-w-full w-full">
          <h3 className="font-semibold max-w-full h-[50px] bg-slate-300 mb-[10px] rounded flex-1"></h3>
          <p className="  h-[20px] mb-[10px] bg-slate-300 rounded"></p>
          <p className="  h-[20px] mb-[10px] bg-slate-300 rounded"></p>
          <p className="  h-[20px] mb-[10px] bg-slate-300 "></p>
        </div>
      </div>
    </div>
  );
};
export default NewsCard;
