import { Request, Response } from 'express';
import * as Yup from 'yup';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SessionInterface } from '../types/modelTypes';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

class SessionController {
  async getToken(req: Request, res: Response) {
    const data: SessionInterface = req.body;

    const dataValid = schema.isValid(data);

    if (!dataValid) {
      return res
        .status(400)
        .json({ message: 'Preencha os dados corretamente!' });
    }

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não cadastrado!' });
    }

    const passwordIsValid = await bcryptjs.compare(
      data.password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    const token = jwt.sign(
      { name: user.firstName, email: user.email, id: user.id },
      process.env.SECRET_KEY_JWT as string,
      { expiresIn: '2 days' },
    );

    return res.status(200).json({ token });
  }

  validateToken(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ auth: false });
    }

    try {
      const tokenIsValid = jwt.verify(
        token,
        process.env.SECRET_KEY_JWT as string,
      );

      if (!tokenIsValid) {
        return res.status(401).json({ auth: false });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ auth: false, message: 'Ocorreu um erro ao verificar token!' });
    }

    const user = jwt.decode(token) as { name: string; email: string };

    return res
      .status(200)
      .json({ auth: true, info: { name: user.name, email: user.email } });
  }
}

export default new SessionController();
