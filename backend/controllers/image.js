import { createSchema, downloadSchema } from '../schemas/image.js';
import { downloadImage, uploadImages } from '../services/image.js';
import { OK } from '../constants/http.js';

export const postImagesHandler = async (req, res) => {
  const { advertId, userId, images } = createSchema.parse({
    images: req.files,
    userId: req.userId,
    advertId: req.params.advertId,
  });

  await uploadImages(advertId, userId, images);

  return res.status(OK).json({ message: 'Images uploaded successfully' });
};

export const getImageHandler = async (req, res) => {
  const { imageId } = downloadSchema.parse({ imageId: req.params.id });

  const { mimetype, downloadStream } = await downloadImage(imageId);

  downloadStream.pipe(res.set('Content-Type', mimetype));
};
