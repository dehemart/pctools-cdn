import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export default class NotFoundController {
  route(req: Request, res: Response) {
    res.status(StatusCodes.NOT_FOUND).send({code: 10404, message: 'Route not found!!!'});
  }
}