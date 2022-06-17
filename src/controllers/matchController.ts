import { Request, Response } from 'express';
import * as Yup from 'yup';
import Match from '../models/Match';
import { MatchInterface } from '../types/modelTypes';

const schema = Yup.object().shape({
  name: Yup.string().min(5).required(),
  date: Yup.string().required(),
  locale: Yup.string().required(),
  value: Yup.number().required(),
  receiver: Yup.string().required(),
});

class MatchController {
  async store(req: Request, res: Response) {
    const match: MatchInterface = req.body;

    const validate = await schema.isValid(match);

    if (!validate) {
      return res
        .status(400)
        .json({ message: 'Preencha os dados corretamente!' });
    }

    await Match.create(match);

    return res.status(201).json({ message: 'Partida criada com sucesso!' });
  }

  async index(req: Request, res: Response) {
    const matchs = await Match.find();

    if (!matchs) {
      return res.status(400).json({ message: 'Ocorreu um erro na busca!' });
    }

    return res.status(200).json(matchs);
  }
}

export default new MatchController();
