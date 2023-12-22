const Scorecard = () => {
  return (
    <>
      <div className="max-w-[400px] shadow-lg bg-white text-[#222] rounded-lg p-[10px] border-[1px] border-[#e6e6e6]">
        <div className="flex gap-[5px] border-b-[#6e6e6e] items-baseline">
          <p className="uppercase text-[15px] font-bold">Result</p>
          <p className="capitalize text-[14px] font-[500]">Only Test</p>
          <p className="capitalize text-[13px] font-[400]">Wankhede</p>
        </div>
        <div className="py-[5px]">
          <div className="flex justify-between">
            <p className="text-[18px] font-[700]">IND</p>
            <p className="text-[18px] font-[700]">
              <span className="text-[13px] font-[400] text-[#3f3f3f]">
                (45.5ov . T:297)
              </span>
              296/8
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[18px] font-[700]">SA</p>
            <p className="text-[18px] font-[700]">
              <span className="text-[13px] font-[400] text-[#3f3f3f]">
                (45.5ov.T:297)
              </span>
              218
            </p>
          </div>
        </div>
        <p className="text-[13px] font-[400] capitalize">
          india won by 78 runs
        </p>
      </div>
    </>
  );
};
export default Scorecard;
