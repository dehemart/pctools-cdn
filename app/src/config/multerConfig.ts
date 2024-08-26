import multer, { MulterError } from 'multer';

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  storage: multer.memoryStorage(),
};


