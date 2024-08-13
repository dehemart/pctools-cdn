import { auth } from '@config/environment';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { exit } from 'process';

type tokenPayload = {
  id: string,
  iat: number,
  exp: number,
}

export class AuthMiddleware {


  execute(req: Request, res: Response, next: NextFunction) {

    const loginUrl = (process.env.BASE_ROUTE || '') + '/login';
    const userUrl = (process.env.BASE_ROUTE || '') + '/users';
    if ((req.baseUrl == loginUrl || req.baseUrl == userUrl) && (req.method == 'POST')) {
      next();
    } else {

      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: 10401, message: 'No authorized!' });
      }
      const [, token] = authorization.split(' ');

      try {
        const verified = verify(token, auth.secret);
        const { id } = verified as tokenPayload;

        res.set('userId', id);

        next();
      } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: 10401, message: 'No authorized!' });
      }
    }
  }
}