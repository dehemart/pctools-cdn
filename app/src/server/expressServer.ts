import express from 'express';
import ServerRoutes from '@controllers/index';
import { expressWinstonLogger } from '@logger/logger';
import { AuthMiddleware } from '@middlewares/authorization/authMiddleware';

export default class ExpressServer {
  private server = express();
  private router = express.Router();
  private serverPort: number;
  private serverRoutes: ServerRoutes;
  private authMidleware: AuthMiddleware;

  constructor() {
    this.authMidleware = new AuthMiddleware;
    this.serverPort = parseInt(process.env.SERVER_PORT || '3331');
    this.serverRoutes = new ServerRoutes();

    this.server.use(expressWinstonLogger);
    this.server.use(express.json());

    // this.server.use('/*', this.authMidleware.execute);
    this.serverRoutes.setRoutes(this.router);
    this.server.use(process.env.BASE_ROUTE || '', this.router);
  }

  getPort(): number {
    return this.serverPort;
  }

  getServer() {
    return this.server;
  }
}