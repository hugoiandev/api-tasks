import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class Middleware {
  // eslint-disable-next-line consistent-return
  async store(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ message: 'Token não informado!' });
    }

    // eslint-disable-next-line consistent-return
    jwt.verify(token as string, process.env.SECRET_KEY_JWT as string, (err) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalido!' });
      }
      next();
    });
  }
}

export default new Middleware();
