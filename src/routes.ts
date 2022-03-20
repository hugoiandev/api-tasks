import { Request, Response, Router } from 'express';
import sessionController from './controllers/sessionController';
import userController from './controllers/userController';
import autenticate from './middlewares/autentication';

const routes = Router();

routes.post('/register', userController.store);

routes.post('/session', sessionController.store);

routes.use(autenticate.store);

// eslint-disable-next-line no-unused-vars
routes.get('/teste', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Você passou do middleware!' });
});

export default routes;
