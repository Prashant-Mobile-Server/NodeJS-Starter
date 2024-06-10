import express, { Express } from 'express';
import { createUser, login } from './controllers/user.controller';
import { getProductDetail, getProductList } from './controllers/product.controller';
import { createOrder } from './controllers/order.controller';
import { emptyCart, getCart, updateCart } from './controllers/cart.controller';
import { authenticateUser } from './middlewares/request/authentication';
import { authoriseUser } from './middlewares/request/authorization';
import { validateCartReq } from './middlewares/cart/requestValidator';
import { initProductListData } from './dataMongo/product.data';
import mongoose from 'mongoose';
import { initUserListData } from './dataMongo/user.data';
import 'dotenv/config'
import { handleServerShutdown } from './serverUtils/serverShutdownHandler';
import { requestLogger } from './middlewares/logger/requestLogger';
import { logger } from '../utility/logger';

const app: Express = express();
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

app.use(express.json());
app.use(requestLogger)

app.post('/api/auth/register', createUser);
app.post('/api/auth/login', login);

app.put('/api/profile/cart', authenticateUser, validateCartReq, updateCart);
app.delete('/api/profile/cart', authenticateUser, authoriseUser, emptyCart);
app.get('/api/profile/cart', authenticateUser, getCart);

app.post('/api/profile/cart/checkout', authenticateUser, createOrder);

app.get('/api/products', authenticateUser, getProductList);
app.get('/api/products/:productId', authenticateUser, getProductDetail);

app.post('/health', async (req, res) => {
    const mongoConnectionState = mongoose.connection.readyState;
    if (mongoConnectionState === 1) {
        res.status(200).json({ status: 'Ok', message: 'Application is healthy' });
    } else {
        res.status(500).json({ status: 'error', message: 'Application has few issues' });
    }
});

await mongoose.connect(mongoUri).then(() => {
    logger.debug(`MongoDB uri: ${mongoUri}`)
    logger.info(`MongoDB uri: ${mongoUri}`)
    logger.info("MongoDB succefully connected")
}).catch(err => {
    logger.error("Error while connecting MongoDB: ", err)
})

const server = app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
    initProductListData();
    initUserListData();
});

handleServerShutdown(server);