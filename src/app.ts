import express, { Express } from 'express';
import 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();

    mongoose.connect(process.env.BD_URL as string);

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
