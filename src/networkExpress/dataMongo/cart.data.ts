import { CartItemRequestObj } from "../entities/cart.entity";
import { v4 as uuidv4 } from 'uuid';
import { CartItemModel, CartModel, CartSchema } from "./models/models";
import { getProductDetailData } from "./product.data";

export const updateCartData = async (userId: string, requestItems: CartItemRequestObj[] | CartItemRequestObj) => {
    try {
        const cartQuery = { userId: userId }
        let cart = await CartModel.findOne(cartQuery);
        if (!Array.isArray(requestItems)) {
            requestItems = [requestItems];
        }
        if (!cart) {
            cart = new CartModel({
                id: uuidv4(),
                userId,
                isDeleted: false,
                items: []
            })
            await cart.save();
        }
        await processItemRequests(cart, requestItems);
        return cart;
    } catch (error) {
        console.error('Error updating cart data:', error.message);
        // throw error;
    }
};

export const emptyCartData = async (userId: string) => {
    try {
        const result = await CartModel.findOneAndDelete({ userId });
        if (result) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error('Error emptying cart data:', error);
        throw error;
    }
};

export const getCartData = async (userId: string) => {
    try {
        const cart = await CartModel.findOne({ userId });
        return cart;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
};

async function processItemRequests(cart, requestItems: CartItemRequestObj[]) {
    for (const itemReq of requestItems) {
        const product = await getProductDetailData(itemReq.productId);
        if (!product) {
            console.log("PRODUCT NOT FOUND");
            return;
        }
        const existingItemIndex = cart.items.findIndex(item => item.product.id === itemReq.productId);
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].count += itemReq.count;
            await cart.save();
        } else {
            const newItem = {
                product: product,
                count: itemReq.count
            };
            cart.items.push(newItem);
            await cart.save();
        }
    }
}
