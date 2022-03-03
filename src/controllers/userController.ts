import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/User';
import { UserInterface } from '../types/modelTypes';

const schema = Yup.object({
  name: Yup.string().min(10).required(),
  last_name: Yup.string().min(10).required(),
  email: Yup.string().min(30).required(),
  password: Yup.string().min(8).required(),
});

const userController = async (req: Request, res: Response) => {
  const user: UserInterface = req.body;

  const validate = await schema.isValid(user);

  if (!validate) {
    return res.status(401).json({ message: 'Preencha os dados corretamente!' });
  }

  const teste = new User(user);
  await teste.save();
  return res.status(200).json({ message: 'Cadastrado com sucesso!' });
};

export default userController;
