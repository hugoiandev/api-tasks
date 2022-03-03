import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/User';
import { UserInterface } from '../types/modelTypes';

const schema = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const userController = async (req: Request, res: Response) => {
  const user: UserInterface = req.body;
  console.log(user);

  const validate = await schema.isValid(user);

  if (!validate) {
    return res.status(400).json({ message: 'Preencha os dados corretamente!' });
  }

  const teste = new User(user);
  await teste.save();
  return res.status(200).json({ message: 'Cadastrado com sucesso!' });
};

export default userController;
