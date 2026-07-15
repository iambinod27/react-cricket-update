// NewsImage.tsx
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPhotos } from "@/store/actions/photos/photosActions";
import { RootState } from "@/store/store";
import { FC, useEffect } from "react";
import DotPulse from "./Loading/DotPulse";

interface NewsImageInterface {
  imageID: number;
  headline: string;
}

const NewsImage: FC<NewsImageInterface> = ({ imageID, headline }) => {
  const dispatch = useAppDispatch();
  const { photos } = useAppSelector((state: RootState) => state.photos);
  const Photo = photos[imageID];

  useEffect(() => {
    if (!Photo && imageID) dispatch(getPhotos(imageID));
  }, [imageID]);

  return (
    <div className="w-full h-full overflow-hidden rounded-[6px] bg-[#f2f2f2]">
      {Photo ? (
        <img
          src={Photo}
          alt={headline}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex items-center justify-center min-h-[190px]">
          <DotPulse />
        </div>
      )}
    </div>
  );
};
export default NewsImage;