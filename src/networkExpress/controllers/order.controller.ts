import { Request, Response } from 'express';
import { createOrderService } from '../services/order.service';

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'];
  const order = await createOrderService(userId);
  res.json(order);
}