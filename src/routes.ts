import { Router } from 'express';
import sessionController from './controllers/sessionController';
import userController from './controllers/userController';
import matchController from './controllers/matchController';
import autenticate from './middlewares/autentication';

const routes = Router();

routes.post('/register', userController.store);

routes.post('/session', sessionController.store);

routes.use(autenticate.store);

routes.get('/match', matchController.index);

routes.post('/match', matchController.store);

export default routes;
