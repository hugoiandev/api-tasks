import { Router } from 'express';
import userController from './controllers/userController';

const routes = Router();

routes.post('/register', userController);

export default routes;
