import { Request, Response } from 'express';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import Task from '../models/Task';
import { TaskInterface } from '../types/modelTypes';

const schema = Yup.object().shape({
  name: Yup.string().min(5).required(),
  description: Yup.string().required(),
  userId: Yup.string().required(),
});

const schemaUpdate = Yup.object().shape({
  name: Yup.string().min(5).required(),
  description: Yup.string().required(),
});

class TaskController {
  async createTask(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const task: TaskInterface = req.body;

    const jwtInfo = jwt.decode(token as string) as { id: string };

    const taskInfo = { ...task, userId: jwtInfo.id };

    const validate = await schema.isValid(taskInfo);

    if (!validate) {
      return res
        .status(400)
        .json({ message: 'Preencha os dados corretamente!' });
    }

    await Task.create(taskInfo);

    return res.status(201).json({ message: 'Tarefa criada com sucesso!' });
  }

  async getTasks(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { id } = jwt.decode(token as string) as { id: string };

    const tasks = await Task.find({ userId: id });

    if (!tasks) return res.status(200).json([]);

    return res.status(200).json(tasks);
  }

  async updateTask(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { taskId } = req.params;
    const { id } = jwt.decode(token as string) as { id: string };
    const { name, description } = req.body;

    const validate = schemaUpdate.isValid({ name, description });

    if (!validate) {
      res.status(400).json({ message: 'Preencha corretamente os campos!' });
    }

    const task = await Task.findOne({ _id: taskId });

    if (!(id === task?.userId.toString())) {
      return res
        .status(400)
        .json({ message: 'Voce nao pode alterar essa tarefa!' });
    }

    await Task.updateOne({ _id: taskId }, { name, description });

    return res.status(200).json({ message: 'Tarefa atualizada' });
  }

  async updateStatusTask(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { taskId } = req.params;
    const { finished } = req.query;
    const { id } = jwt.decode(token as string) as { id: string };

    const task = await Task.findOne({ _id: taskId });

    if (!task) res.status(400).json({ message: 'Tarefa nao encontrada!' });

    if (!(id === task?.userId.toString())) {
      return res
        .status(400)
        .json({ message: 'Voce nao pode alterar essa tarefa!' });
    }
    
    if (task.finished) {
      await Task.updateOne({ _id: taskId }, { finished: false });
    } else {
      await Task.updateOne({ _id: taskId }, { finished: true });
    }

    return res.status(200).json({ message: 'Tarefa altereda!' });
  }

  async deleteTask(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { taskId } = req.params;
    const { id } = jwt.decode(token as string) as { id: string };

    const task = await Task.findOne({ _id: taskId });

    if (!task) res.status(400).json({ message: 'Tarefa nao encontrada!' });

    if (!(id === task?.userId.toString())) {
      return res
        .status(400)
        .json({ message: 'Voce nao pode excluir essa tarefa!' });
    }

    await Task.deleteOne({ _id: taskId });

    return res.status(200).json({ message: 'Tarefa excluida!' });
  }
}

export default new TaskController();
