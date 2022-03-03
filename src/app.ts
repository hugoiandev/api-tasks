import express from 'express';
import routes from './routes';

import { Express } from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
class App {
  server: Express;

  constructor() {
    this.server = express();

    mongoose.connect('mongodb+srv://hugofront:vRtZsePErgjlj7gd@cluster0.kfscp.mongodb.net/Delivery?retryWrites=true&w=majority');

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
