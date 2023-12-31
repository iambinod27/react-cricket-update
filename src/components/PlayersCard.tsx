import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { RootState } from "@/store/store";
import patCummins from "../assets/images/pat-cummins.png";
import { useEffect } from "react";

const PlayersCard = ({ player }) => {
  const dispatch = useAppDispatch();
  const imageID = player.id;
  const { Photo } = useAppSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(getPhotos(imageID));
  }, [dispatch, imageID]);
  return (
    <div className="border shadow-lg p-[15px] rounded-[20px]">
      <div className="mb-[10px] min-h-[300px] flex items-center">
        {Photo ? (
          <img src={Photo} alt={player.name} className="object-cover  h-full" />
        ) : (
          <img src={patCummins} alt={player.name} />
        )}
      </div>
      <p className="text-[24px] leading-[32px] font-[600]">{player.name}</p>
      <p className="text-[18px] font-[400]">{player.teamName}</p>
    </div>
  );
};
export default PlayersCard;
