import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ImageGetByIdController {

  route = async (req: Request, res: Response): Promise<Response> => {

    return res.status(StatusCodes.OK).json({message : 'Get by id in development'});
  };
}