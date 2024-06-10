import { Request, Response } from 'express';
import { updateCartService, emptyCartService, getCartService } from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'];
  const cart = await getCartService(userId);
  res.json(cart);
};

export const emptyCart = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'];
  const cart = await emptyCartService(userId);
  res.json(cart);
};

export const updateCart = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'];
  const requestBody = req.body;
  const cart = await updateCartService(userId, requestBody);
  res.json(cart);
};
