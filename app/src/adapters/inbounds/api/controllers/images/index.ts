import { ImageCreateController } from '@controllers/images//imageCreateController';
import { ImageCreateResolutionController } from './imageCreateResolutionController';
import { ImageDeleteController } from '@controllers/images/imageDeleteController';
import { ImageGetAllController } from '@controllers/images/imageGetAllController';
import { ImageGetByIdController } from '@controllers/images/imageGetByIdController';
import { ImageUpdateController } from '@controllers/images/imageUpdateController';
import { ImageUploadMiddleware } from '@middlewares/image/imageUploadMiddleware';
import { Router } from 'express';

export default class ImageRoute {
  private imageGetAllController: ImageGetAllController;
  private imageCreateController: ImageCreateController;
  private imageCreateResolutionController: ImageCreateResolutionController;
  private imageGetByIdController: ImageGetByIdController;
  private imageUpdateController: ImageUpdateController;
  private imageDeleteController: ImageDeleteController;
  private imageUploadMiddleware: ImageUploadMiddleware;

  constructor() {
    this.imageCreateController = new ImageCreateController();
    this.imageGetAllController = new ImageGetAllController();
    this.imageGetByIdController = new ImageGetByIdController();
    this.imageUpdateController = new ImageUpdateController();
    this.imageDeleteController = new ImageDeleteController();
    this.imageUploadMiddleware = new ImageUploadMiddleware();
    this.imageCreateResolutionController = new ImageCreateResolutionController();
  }

  registerRoutes(router: Router) {
    router.post('/images/:id/:suffix', this.imageUploadMiddleware.execute, this.imageCreateController.route);
    router.post('/images/:id', this.imageUploadMiddleware.execute, this.imageCreateController.route);

    router.get('/images/:id/:suffix', this.imageGetByIdController.route);
    router.get('/images/:id', this.imageGetAllController.route);

    router.put('/images/:id/:x/:y', this.imageCreateResolutionController.route);
    router.put('/images/:id/:suffix', this.imageUpdateController.route);

    router.delete('/images/:id/:suffix', this.imageDeleteController.route);
    router.delete('/images/:id', this.imageDeleteController.route);
  }
}