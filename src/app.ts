import express, { Express } from 'express';

import mongoose from 'mongoose';

import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
class App {
  server: Express;

  constructor() {
    this.server = express();

    mongoose.connect(process.env.URL_CONNECT as string);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default App;
