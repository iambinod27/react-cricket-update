import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { getIccPlayerRaking } from "@/store/actions/ranking/rankingActions";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

const Ranking = () => {
  const dispatch = useAppDispatch();
  const { RankLoading, batsmen } = useAppSelector(
    (state: RootState) => state.ranking
  );

  useEffect(() => {
    batsmen.rank?.map((item) => dispatch(getPhotos(item.faceImageId)));
  }, [dispatch]);

  const { Photo } = useAppSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(getIccPlayerRaking());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(0);

  console.log(Photo);

  return (
    <>
      <h3 className="text-[32px] font-[700]">ICC RANKING</h3>
      {RankLoading ? (
        <>
          <div className="flex w-full overflow-x-auto">
            <table className="table ">
              <thead className="bg-[#333] text-[#fff]">
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {batsmen.rank?.map((batter) => (
                  <>
                    <tr key={batter.id}>
                      <th>{batter.rank}</th>
                      <td className="flex items-center gap-[5px]">
                        {Photo ? (
                          <>
                            <div className="avatar">
                              <img src={Photo} alt={batter.name} />
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {batter.name}
                      </td>
                      <td>{batter.country}</td>
                      <td>{batter.points}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen w-full flex items-center justify-center">
            <DotPulse />
          </div>
        </>
      )}
    </>
  );
};
export default Ranking;
