import { CartEntity } from "../entities/cart.entity"
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity, OrderStatus } from "../entities/order.entity";
import { OrderModel } from "./models/models";

const cartsMap = new Map<string, OrderEntity>();

export const createOrderData = async (userId: string, cart: CartEntity) => {
    let totalCount = 0;
    if (cart && cart.items) {
        cart.items.forEach((item) => {
            totalCount += item.count;
        });
    }

    const order = new OrderModel({
        id: uuidv4(),
        userId,
        cartId: cart.id,
        items: cart.items,
        payment: {
            type: "paypal",
            address: "London",
            creditCard: 1234 - 1234 - 1234 - 1234
        },
        delivery: {
            type: "post",
            address: "London"
        },
        comments: "",
        status: OrderStatus.Created,
        total: totalCount
    });
    await order.save();
    return order;
}