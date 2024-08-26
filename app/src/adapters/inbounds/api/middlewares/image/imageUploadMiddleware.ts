import multerConfig from '@config/multerConfig';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import sharp from 'sharp';

export class ImageUploadMiddleware {

  execute(req: Request, res: Response, next: NextFunction) {
    const upload = multer(multerConfig).single('image');
    const id = req.params.id;
    const suffix = req.params.suffix != undefined ? '_' + req.params.suffix : '';


    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        try {
          switch (err.code) {
          case 'LIMIT_UNEXPECTED_FILE':
            throw new Error('Invalid file type! Only PNG and JPEG are allowed');

          case 'LIMIT_FILE_SIZE':
            throw new Error('File size is too large! Max size is 2MB');

          default:
            throw new Error('Something went wrong!');
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
          return;
        }
      }

      try {
        const fileName = `${id}${suffix}${path.extname(req.file!.originalname)}`;
        const saveTo = path.resolve(dirname(require!.main!.filename), 'public', 'images');
        const filePath = path.join(saveTo, fileName);

        await sharp(req.file!.buffer)
          // .resize(500, 500,{
          //   fit: sharp.fit.cover
          // })
          .jpeg({ quality: 80 })
          .toFile(filePath);

        req.file!.filename = fileName;

        next();
      } catch (err) {
        res.status(400).json({ message: err.message });
        return;
      }
    });
  }}