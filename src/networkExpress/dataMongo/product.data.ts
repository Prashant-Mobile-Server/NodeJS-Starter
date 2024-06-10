import { ProductEntity } from "../entities/product.entity";
import { ProductModel } from "./models/models";
import { logger } from '../../utility/logger';

export const initProductListData = async () => {
    try {
        const product1 = new ProductModel({
            id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
            title: 'Book',
            description: 'A very interesting book',
            price: 100
        });
        await product1.save();

        const product2 = new ProductModel({
            id: '61422fcd-0366-4186-ad5b-c23059b6f64f',
            title: 'Book One',
            description: 'A very interesting book',
            price: 150
        });
        await product2.save();

        const product3 = new ProductModel({
            id: '71422fcd-0366-4186-ad5b-c23059b6f64f',
            title: 'Book Two',
            description: 'A very interesting book',
            price: 200
        });
        await product3.save();
    } catch (error) {
        if (error.code === 11000) {
            logger.debug('Error: Duplicate "id" found.');
        } else {
            logger.error('Error:', error);
        }
    }
}

export const getProductDetailData = async (productId: string): Promise<ProductEntity | null> => {
    try {
        const product = await ProductModel.findOne({ id: productId });
        return product;
    } catch (error) {
        logger.error('Error fetching product detail:', error.message);
    }
};

export const getProductListData = async (): Promise<ProductEntity[]> => {
    try {
        const productList = await ProductModel.find();
        return productList;
    } catch (error) {
        logger.error('Error fetching product list:', error.message);
    }
};