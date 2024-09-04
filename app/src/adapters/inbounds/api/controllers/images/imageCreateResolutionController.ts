import { Request, Response } from 'express';
import { glob } from 'glob';
import { StatusCodes } from 'http-status-codes';
import path, { dirname } from 'path';
import sharp from 'sharp';


export class ImageCreateResolutionController {

  route = async (req: Request, res: Response): Promise<Response> => {

    try {
      const id = req.params.id;
      const size_x: number = Number(req.params.x);
      const size_y: number = Number(req.params.y);

      const saveTo = path.resolve(dirname(require!.main!.filename), 'public', 'images');

      const existFile = await glob(saveTo + '/' + id + '.*', {
        signal: AbortSignal.timeout(100),
      });

      if (!existFile[0]){
        return res.status(StatusCodes.BAD_REQUEST).json({message : 'The file does not exists'});
      }

      const fileName = `${id}_${size_x}x${size_y}${path.extname(existFile[0])}`;

      const filePath = path.join(saveTo, fileName);

      await sharp(existFile[0])
        .resize(size_x, size_y, {
          fit: sharp.fit.outside
        })
        .jpeg({ quality: 80 })
        .toFile(filePath);

      return res.status(StatusCodes.CREATED).json({message : `Image resolution created', file: http://localhost:3331/pc/images/${fileName}`});
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };
}