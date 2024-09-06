import multer, { FileFilterCallback, MulterError } from 'multer';
import {Request } from 'express';

export default {
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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