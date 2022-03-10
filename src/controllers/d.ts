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

export default userController;
