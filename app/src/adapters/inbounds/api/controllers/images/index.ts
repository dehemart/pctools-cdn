import { ImageCreateController } from '@controllers/images//imageCreateController';
import { ImageDeleteController } from '@controllers/images/imageDeleteController';
import { ImageGetAllController } from '@controllers/images/imageGetAllController';
import { ImageGetByIdController } from '@controllers/images/imageGetByIdController';
import { ImageUpdateController } from '@controllers/images/imageUpdateController';
import { Router } from 'express';

export default class ImageRoute {
  private imageGetAllController: ImageGetAllController;
  private imageCreateController: ImageCreateController;
  private imageGetByIdController: ImageGetByIdController;
  private imageUpdateController: ImageUpdateController;
  private imageDeleteController: ImageDeleteController;

  constructor() {
    this.imageCreateController = new ImageCreateController();
    this.imageGetAllController = new ImageGetAllController();
    this.imageGetByIdController = new ImageGetByIdController();
    this.imageUpdateController = new ImageUpdateController();
    this.imageDeleteController = new ImageDeleteController();

  }

  registerRoutes(router: Router) {
    router.post('/images/:id/:suffix', this.imageCreateController.route);
    router.post('/images/:id', this.imageCreateController.route);

    router.get('/images/:id', this.imageGetAllController.route);
    router.get('/images/:id/:suffix', this.imageGetByIdController.route);

    router.put('/images/:id/:suffix', this.imageUpdateController.route);

    router.delete('/images/:id', this.imageDeleteController.route);
    router.delete('/images/:id/:suffix', this.imageDeleteController.route);
  }
}