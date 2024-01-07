import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { RootState } from "@/store/store";
import patCummins from "../assets/images/pat-cummins.png";
import { useEffect } from "react";

const PlayersCard = ({ player }) => {
  const dispatch = useAppDispatch();
  const { Photo } = useAppSelector((state: RootState) => state.photos);
  const imageID = player.faceImageId;

  useEffect(() => {
    dispatch(getPhotos(imageID));
  }, [imageID]);
  return (
    <div className="border shadow-lg  rounded-[20px] overflow-hidden">
      <div className="mb-[10px] min-h-[260px] flex items-center">
        {Photo ? (
          <img src={Photo} alt={player.name} className="object-cover  h-full" />
        ) : (
          <img src={patCummins} alt={player.name} />
        )}
      </div>
      <div className="p-[15px]">
        <p className="text-[24px] leading-[32px] font-[600]">{player.name}</p>
        <p className="text-[18px] font-[400]">{player.teamName}</p>
      </div>
    </div>
  );
};
export default PlayersCard;
