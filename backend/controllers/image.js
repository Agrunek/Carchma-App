import { postImagesSchema } from '../schemas/image.js';
import { downloadImage, removeImage, uploadImages } from '../services/image.js';
import { OK } from '../constants/http.js';

export const postImagesHandler = async (req, res) => {
  const { images } = postImagesSchema.parse({ images: req.files });

  await uploadImages(req.params.advertId, req.userId, images);

  return res.status(OK).json({ message: 'Images uploaded successfully' });
};

export const getImageHandler = async (req, res) => {
  const { mimetype, downloadStream } = await downloadImage(req.params.id);

  downloadStream.pipe(res.set('Content-Type', mimetype));
};

export const deleteImageHandler = async (req, res) => {
  await removeImage(req.params.id, req.userId);

  return res.status(OK).json({ message: 'Image deleted successfully' });
};
