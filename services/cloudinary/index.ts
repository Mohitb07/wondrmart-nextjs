import { CloudinaryImage } from "@cloudinary/url-gen";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

export const cloudinaryImage = ({
  imageUrl,
  height,
  width,
}: {
  imageUrl: string;
  height: number;
  width: number;
}) => {
  const image = new CloudinaryImage(imageUrl, {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  })
    .resize(fit().width(width).height(height))
    .roundCorners(byRadius(1))
    .format("png");
  return image;
};
