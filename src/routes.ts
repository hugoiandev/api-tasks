import { Router } from 'express';
import userController from './controllers/userController';

const routes = Router();

routes.post('/register', userController.store);

routes.post('/login', userController.index);

export default routes;
