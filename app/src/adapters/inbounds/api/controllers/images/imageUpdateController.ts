import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ImageUpdateController {

  route = async (req: Request, res: Response): Promise<Response> => {

    return res.status(StatusCodes.OK).json({message : 'Update in development'});
  };
}