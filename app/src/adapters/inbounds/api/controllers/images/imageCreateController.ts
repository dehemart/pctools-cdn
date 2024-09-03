import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ImageCreateController {

  route = async (req: Request, res: Response): Promise<Response> => {

    return res.status(StatusCodes.CREATED).json({message : 'Create in development', file: req.file?.filename});
  };
}