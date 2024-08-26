import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ImageDeleteController {

  route = async (req: Request, res: Response): Promise<Response> => {

    return res.status(StatusCodes.NO_CONTENT).json({message : 'Delete in development'});
  };
}