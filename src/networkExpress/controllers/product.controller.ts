import { Request, Response } from 'express';
import { getProductListService, getProductDetailService } from '../services/product.service';

export const getProductList = async (req: Request, res: Response) => {
  const productList = await getProductListService();
  res.json(productList);
};

export const getProductDetail = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productResponse = await getProductDetailService(productId);
  res.json(productResponse);
};
