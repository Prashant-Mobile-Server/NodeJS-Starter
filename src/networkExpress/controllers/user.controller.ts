import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const resp = await createUserService(req.body, res);
  if (resp) {
    res.json(resp);
  }
};

export const login = async (req: Request, res: Response) => {
  const resp = await loginService(req.body, res);
  if (resp) {
    res.json(resp);
  }
};

