import { CartItemEntity } from "../entities/cart.entity";


export interface OrderEntity {
    readonly id: string;
    readonly userId: string;
    readonly cartId: string;
    readonly items: ReadonlyArray<CartItemEntity>; // products from CartEntity
    readonly payment?: {
        readonly type: string;
        readonly address?: any;
        readonly creditCard?: any;
    };
    readonly delivery?: {
        readonly type: string;
        readonly address: any;
    };
    readonly comments?: string;
    readonly status?: OrderStatus;
    readonly total?: number;
}

export enum OrderStatus {
    Created = 'created',
    Completed = 'completed',
}
