import { IPostImage } from '@/types/post.interface';

export const usePostCardImagePath = (images: IPostImage[]) => {
  if (images.length === 0) {
    return './icon/no-image.png';
  } else {
    const minOrderImage = images.reduce((minImage, currentImage) =>
      currentImage.order < minImage.order ? currentImage : minImage,
    );

    return `${process.env.SERVER_URL}/${minOrderImage.filePath}`;
  }
};
