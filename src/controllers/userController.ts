import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/User';
import { UserInterface } from '../types/modelTypes';

const schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

class UserController {
  async store(req: Request, res: Response) {
    const user: UserInterface = req.body;

    const validate = await schema.isValid(user);

    if (!validate) {
      return res.status(400).json({ message: 'Preencha os dados corretamente!' });
    }

    const findUser = await User.findOne({ email: user.email });

    if (findUser) {
      return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    const { email, firstName } = await User.create(user);
    return res.status(201).json({ email, firstName });
  }
}

export default new UserController();

// const sessionController = async (req: Request, res: Response) => {
//   const user: SessionInterface = req.body;

//   const validate = await schema.isValid(user);

//   if (!validate) {
//     return res.status(400).json({ message: 'Preencha os dados corretamente!' });
//   }

//   const { email } = await User.findOne({ email: user.email }).exec();

//   if (!email) {
//     return res.status(404).json({ message: 'Conta não encontrada!' });
//   }

//   return res.status(200).json({ message: 'Logado com sucesso!' });
// };
