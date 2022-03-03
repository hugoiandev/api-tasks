import { Router } from 'express';
import userController from './controllers/userController';

const routes = Router();

routes.get('/login', (req, res) => {
  res.json({ name: 'Hugo' });
});

export default routes;
