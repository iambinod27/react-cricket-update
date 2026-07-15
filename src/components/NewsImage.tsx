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
    if (!Photo) dispatch(getPhotos(imageID));
  }, [imageID]);

  return (
    <>
      {Photo ? (
        <img src={Photo} alt={headline} className="object-cover w-full" />
      ) : (
        <div className="flex items-center justify-center">
          <DotPulse />
        </div>
      )}
    </>
  );
};
export default NewsImage;
