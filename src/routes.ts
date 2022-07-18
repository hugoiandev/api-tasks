import { Router } from 'express';
import sessionController from './controllers/sessionController';
import userController from './controllers/userController';
import taskController from './controllers/taskController';
import autenticate from './middlewares/autentication';

const routes = Router();

routes.post('/register', userController.register);

routes.post('/session', sessionController.getToken);

routes.post('/session/validate', sessionController.validateToken);

routes.use(autenticate.store);

routes.get('/task', taskController.getTasks);

routes.post('/task', taskController.createTask);

routes.put('/task/:taskId', taskController.updateTask);

routes.patch('/task/:taskId', taskController.updateStatusTask);

routes.delete('/task/:taskId', taskController.deleteTask);

export default routes;
