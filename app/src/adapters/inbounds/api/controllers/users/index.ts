import { Router } from 'express';
import {UserGetAllController} from '@controllers/users/userGetAllController';
import { UserGetAllValidator } from '@validators/users/userGetAllValidator';
import {UserCreateController} from '@controllers/users//userCreateController';
import { UserCreateValidator } from '@validators/users/userCreateValidator';
import { UserGetByIdValidator } from '@validators/users/userGetByIdValidator';
import {UserGetByIdController} from '@controllers/users/userGetByIdController';
import { UserUpdateValidator } from '@validators/users/userUpdateValidator';
import {UserUpdateController} from '@controllers/users/userUpdateController';
import { UserDeleteValidator } from '@validators/users/userDeleteValidator';
import {UserDeleteController} from '@controllers/users/userDeleteController';

export default class UserRoute {
  private userGetAllController: UserGetAllController;
  private userGetAllValidator: UserGetAllValidator;
  private userCreateController: UserCreateController;
  private userCreateValidator: UserCreateValidator;
  private userGetByIdController: UserGetByIdController;
  private userGetByIdValidator: UserGetByIdValidator;
  private userUpdateController: UserUpdateController;
  private userUpdateValidator: UserUpdateValidator;
  private userDeleteController: UserDeleteController;
  private userDeleteValidator: UserDeleteValidator;

  constructor() {
    this.userCreateController = new UserCreateController();
    this.userCreateValidator = new UserCreateValidator();

    this.userGetAllController = new UserGetAllController();
    this.userGetAllValidator = new UserGetAllValidator();

    this.userGetByIdController = new UserGetByIdController();
    this.userGetByIdValidator = new UserGetByIdValidator();

    this.userUpdateController = new UserUpdateController();
    this.userUpdateValidator = new UserUpdateValidator();

    this.userDeleteController = new UserDeleteController();
    this.userDeleteValidator = new UserDeleteValidator();

  }

  registerRoutes(router: Router) {
    router.post('/users', this.userCreateValidator.validate(), this.userCreateController.route);
    router.get('/users', this.userGetAllValidator.validate(), this.userGetAllController.route);
    router.get('/users/:id', this.userGetByIdValidator.validate(), this.userGetByIdController.route);
    router.put('/users/:id', this.userUpdateValidator.validate(), this.userUpdateController.route);
    router.delete('/users/:id', this.userDeleteValidator.validate(), this.userDeleteController.route);
  }
}