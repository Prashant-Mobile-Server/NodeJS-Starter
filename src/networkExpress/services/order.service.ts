import { getCartData } from '../dataMongo/cart.data';
import { createOrderData } from '../dataMongo/order.data';
export async function createOrderService(userId: string | string[]) {
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
    const order = await createOrderData(finalUserId, cart)
    response = {
        data: order,
        error: null
    }
    return response;
};