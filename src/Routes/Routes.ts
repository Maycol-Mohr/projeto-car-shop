import { Router } from 'express';
import CarController from '../Controllers/CarController';
import validatedCarId from '../Middlewares/ValidateCarId';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).createCar(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);

routes.get(
  '/cars/:id', 
  validatedCarId,
  (req, res, next) => new CarController(req, res, next).getCarsById(),
);
  
export default routes;