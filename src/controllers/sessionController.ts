import { Request, Response } from 'express';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SessionInterface } from '../types/modelTypes';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

class SessionController {
  async store(req: Request, res: Response) {
    const data: SessionInterface = req.body;

    const dataValid = schema.isValid(data);

    if (!dataValid) {
      return res.status(400).json({ message: 'Preencha os dados corretamente!' });
    }

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não cadastrado!' });
    }

    const passwordIsValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    const token = jwt.sign({ name: user.firstName, email: user.email }, process.env.KEY_JWT as string);

    return res.status(200).json({ token });
  }
}

export default new SessionController();
