import multerConfig from '@config/multerConfig';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import path, { dirname } from 'path';
import sharp from 'sharp';

export class ImageCreateResolutionController {

  route = async (req: Request, res: Response): Promise<Response> => {
    const upload = multer(multerConfig).single('image');

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        try {
          switch (err.code) {
          case 'LIMIT_UNEXPECTED_FILE':
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Invalid file type! Only PNG and JPEG are allowed' });

          case 'LIMIT_FILE_SIZE':
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'File size is too large! Max size is 2MB' });

          default:
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Something went wrong!' });
          }
        } catch (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
      }
    }
    );

    try {
      const id = req.params.id;
      const size_x: number = Number(req.params.x);
      const size_y: number = Number(req.params.y);

      const fileName = `${id}_${size_x}x${size_y}${path.extname(req.file!.originalname)}`;
      const saveTo = path.resolve(dirname(require!.main!.filename), 'public', 'images');
      const filePath = path.join(saveTo, fileName);

      const fileToProcess = req.file != null ? req.file!.buffer : filePath;

      await sharp(fileToProcess)
        .resize(size_x, size_y, {
          fit: sharp.fit.outside
        })
        .jpeg({ quality: 80 })
        .toFile(filePath);

    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(StatusCodes.CREATED).json({message : 'Image resolution created', file: 'images/' + req.file?.filename});
  };
}