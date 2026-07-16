import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { RootState } from "@/store/store";
import { FC, useEffect } from "react";

interface TeamLogoInterface {
  imageID?: number;
  size?: number;
}

const TeamLogo: FC<TeamLogoInterface> = ({ imageID, size = 20 }) => {
  const dispatch = useAppDispatch();
  const { photos } = useAppSelector((state: RootState) => state.photos);
  const Photo = imageID ? photos[imageID] : undefined;

  useEffect(() => {
    if (imageID && !Photo) dispatch(getPhotos(imageID));
  }, [imageID]);

  if (!imageID) return null;

  return Photo ? (
    <img
      src={Photo}
      alt=""
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="rounded-full bg-[#eee] shrink-0"
      style={{ width: size, height: size }}
    />
  );
};
export default TeamLogo;