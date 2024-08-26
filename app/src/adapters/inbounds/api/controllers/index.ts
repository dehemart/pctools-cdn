import { Router } from 'express';
import UserRoute from '@controllers/users';
import NotFoundController from '@controllers/notFound/notFoundController';
import LoginRoute from '@controllers/login';
import ImageRoute from './images';


export default class ServerRoutes {
  private loginRoutes: LoginRoute;
  private userRoute: UserRoute;
  private imageRoute: ImageRoute;

  constructor(
    private notFoundRoute = new NotFoundController()) {
    this.loginRoutes = new LoginRoute();
    this.userRoute = new UserRoute();
    this.imageRoute = new ImageRoute();
  }

  setRoutes(server: Router) {

    this.loginRoutes.registerRoutes(server);
    this.userRoute.registerRoutes(server);
    this.imageRoute.registerRoutes(server);


    server.use('/*', this.notFoundRoute.route);
  }
}