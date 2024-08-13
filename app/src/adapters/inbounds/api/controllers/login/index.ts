import { Router } from 'express';
import { LoginController } from '@controllers/login/loginController';
import { LoginValidator } from '@validators/login/loginValidator';



export default class LoginRoute {

  private loginController: LoginController;
  private loginValidator: LoginValidator;

  constructor() {
    this.loginController = new LoginController();
    this.loginValidator = new LoginValidator();
  }

  registerRoutes(router: Router) {
    router.post('/login', this.loginValidator.validate(), this.loginController.route);
  }
}