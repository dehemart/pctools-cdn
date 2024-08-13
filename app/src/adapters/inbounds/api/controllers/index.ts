import { Router } from 'express';
import UserRoute from '@controllers/users';
import NotFoundController from '@controllers/notFound/notFoundController';
import LoginRoute from '@controllers/login';


export default class ServerRoutes {
  private loginRoutes: LoginRoute;
  private userRoute: UserRoute;

  constructor(
    private notFoundRoute = new NotFoundController()) {
    this.loginRoutes = new LoginRoute();
    this.userRoute = new UserRoute();
  }

  setRoutes(server: Router) {

    this.loginRoutes.registerRoutes(server);
    this.userRoute.registerRoutes(server);

    server.use('/*', this.notFoundRoute.route);
  }
}