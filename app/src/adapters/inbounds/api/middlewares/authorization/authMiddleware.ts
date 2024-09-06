import { AppEnvironment } from '@config/appEnvironment';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

type tokenPayload = {
  id: string,
  iat: number,
  exp: number,
}

export class AuthMiddleware {


  execute(req: Request, res: Response, next: NextFunction) {

    const loginUrl = AppEnvironment.baseRoute + '/login';
    const userUrl = AppEnvironment.baseRoute + '/users';
    if ((req.baseUrl == loginUrl || req.baseUrl == userUrl) && (req.method == 'POST')) {
      next();
    } else {

      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: 10401, message: 'No authorized!' });
      }
      const [, token] = authorization.split(' ');

      try {
        const verified = verify(token, AppEnvironment.auth.secret);
        const { id } = verified as tokenPayload;

        res.set('userId', id);

        next();
      } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: 10401, message: 'No authorized!' });
      }
    }
  }
}