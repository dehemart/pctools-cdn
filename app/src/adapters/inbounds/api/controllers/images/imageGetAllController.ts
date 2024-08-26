import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ImageGetAllController {

  route = async (req: Request, res: Response): Promise<Response> => {

    return res.status(StatusCodes.OK).json({message : 'Get all in development'});
  };
}