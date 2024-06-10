import mongoose from 'mongoose';

const { Schema } = mongoose;


export const ProductSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

// Define interfaces for TypeScript type checking
export const CartItemSchema = new Schema({
    product: { type: ProductSchema, required: true },
    count: { type: Number, required: true },
});

export const CartSchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
    items: [CartItemSchema],
});

export const OrderSchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    cartId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    payment: {
        type: { type: String, required: true },
        address: Schema.Types.Mixed,
        creditCard: Schema.Types.Mixed,
    },
    delivery: {
        type: { type: String, required: true },
        address: Schema.Types.Mixed,
    },
    comments: { type: String },
    status: { type: String, required: true },
    total: { type: Number, required: true },
});

export const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

// Define models based on schemas
export const CartItemModel = mongoose.model('CartItem', CartItemSchema);
export const CartModel = mongoose.model('Cart', CartSchema);
export const ProductModel = mongoose.model('Product', ProductSchema);
export const UserModel = mongoose.model('User', UserSchema);
export const OrderModel = mongoose.model('Order', OrderSchema);
