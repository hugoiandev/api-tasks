import express from 'express';

import { Express } from 'express';

class App {
  server: Express;

  constructor() {
    this.server = express();
  }
}

export default App;
