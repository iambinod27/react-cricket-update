import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { getIccPlayerRaking } from "@/store/actions/ranking/rankingActions";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

// small subcomponent — one per row, looks up its own photo by ID
const RankAvatar = ({ imageID, name }: { imageID: number; name: string }) => {
  const dispatch = useAppDispatch();
  const { photos } = useAppSelector((state: RootState) => state.photos);
  const Photo = photos[imageID];

  useEffect(() => {
    if (!Photo && imageID) dispatch(getPhotos(imageID));
  }, [imageID]);

  return Photo ? (
    <div className="avatar">
      <img src={Photo} alt={name} />
    </div>
  ) : null;
};

const Ranking = () => {
  const dispatch = useAppDispatch();
  const { RankLoading, batsmen } = useAppSelector(
    (state: RootState) => state.ranking
  );

  useEffect(() => {
    dispatch(getIccPlayerRaking());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <h3 className="text-[32px] font-[700]">ICC RANKING</h3>
      {RankLoading ? (
        <div className="min-h-screen w-full flex items-center justify-center">
          <DotPulse />
        </div>
      ) : (
        <div className="flex w-full overflow-x-auto">
          <table className="table">
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
                <tr key={batter.id}>
                  <th>{batter.rank}</th>
                  <td className="flex items-center gap-[5px]">
                    <RankAvatar imageID={batter.faceImageId} name={batter.name} />
                    {batter.name}
                  </td>
                  <td>{batter.country}</td>
                  <td>{batter.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Ranking;