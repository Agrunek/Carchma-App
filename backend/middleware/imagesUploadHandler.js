import multer from 'multer';
import { ALLOWED_MIME_TYPES, FILES_FIELDNAME, MAX_FILE_SIZE, MAX_NUMBER_OF_FILES } from '../constants/image.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: MAX_NUMBER_OF_FILES },
  fileFilter: (req, file, cb) => cb(null, ALLOWED_MIME_TYPES.includes(file.mimetype)),
});

const imagesUploadHandler = upload.array(FILES_FIELDNAME, MAX_NUMBER_OF_FILES);

export default imagesUploadHandler;
