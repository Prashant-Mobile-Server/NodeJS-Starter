import { emptyCartData, getCartData, updateCartData } from '../dataMongo/cart.data';
import { CartItemRequestObj } from '../entities/cart.entity';

export async function updateCartService(userId: string | string[], items: CartItemRequestObj[] | CartItemRequestObj) {
    let finalUserId: string;
    if (Array.isArray(userId)) {
        finalUserId = userId[0];
    } else {
        finalUserId = userId;
    }
    const cart = await updateCartData(finalUserId, items)
    let totalCount = 0;
    if (cart && cart.items) {
        cart.items.forEach((item) => {
            totalCount += item.count;
        });
    }
    const response = {
        data: {
            cart: {
                id: cart.id,
                items: cart.items,
                total: totalCount
            }
        },
        error: null
    }
    return response;
};

export async function emptyCartService(userId: string | string[]) {
    let finalUserId: string;
    if (Array.isArray(userId)) {
        finalUserId = userId[0];
    } else {
        finalUserId = userId;
    }
    const deleted = await emptyCartData(finalUserId);
    const response = {
        data: {
            success: deleted
        },
        error: null
    }
    return response;
};

export async function getCartService(userId: string | string[]) {
    let finalUserId: string;
    let response;
    if (Array.isArray(userId)) {
        finalUserId = userId[0];
    } else {
        finalUserId = userId;
    }
    const cart = await getCartData(finalUserId)
    if (!cart) {
        response = {
            data: null,
            error: {
                message: "Empty Cart"
            }
        }
        return response;
    }
    let totalCount = 0;
    if (cart && cart.items) {
        cart.items.forEach((item) => {
            totalCount += item.count;
        });
    }
    response = {
        data: {
            cart: {
                id: cart.id,
                items: cart.items,
                total: totalCount
            }
        },
        error: null
    }
    return response;
};
