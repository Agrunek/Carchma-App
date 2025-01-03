import multer from 'multer';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_NUMBER_OF_FILES = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const FILES_FIELDNAME = 'images';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: MAX_NUMBER_OF_FILES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
});

const imagesUploadHandler = upload.array(FILES_FIELDNAME, MAX_NUMBER_OF_FILES);

export default imagesUploadHandler;
