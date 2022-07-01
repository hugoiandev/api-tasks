import { Router } from 'express';
import sessionController from './controllers/sessionController';
import userController from './controllers/userController';
import taskController from './controllers/taskController';
import autenticate from './middlewares/autentication';

const routes = Router();

routes.post('/register', userController.store);

routes.post('/session', sessionController.store);

routes.use(autenticate.store);

routes.get('/task', taskController.index);

routes.post('/task', taskController.store);

routes.put('/task/:taskId', taskController.update);

routes.patch('/task/:taskId', taskController.patch);

routes.delete('/task/:taskId', taskController.destroy);

export default routes;
