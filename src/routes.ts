import { Router } from 'express';
import sessionController from './controllers/sessionController';
import userController from './controllers/userController';

const routes = Router();

routes.post('/register', userController.store);

routes.post('/session', sessionController.store);

export default routes;
