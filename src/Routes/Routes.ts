import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotoController';
import validatedCarId from '../Middlewares/ValidateCarId';
import validatedMotorcycleId from '../Middlewares/ValidateMotorcycleId';

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

routes.put(
  '/cars/:id',
  validatedCarId,
  (req, res, next) => new CarController(req, res, next).updateCar(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAllMotorcycles(),
);

routes.get(
  '/motorcycles/:id', 
  validatedMotorcycleId,
  (req, res, next) => new MotorcycleController(req, res, next).getMotorcycleById(),
);
  
export default routes;