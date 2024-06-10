import { logger } from '../../utility/logger';
import { createUser, login } from '../dataMongo/user.data';

export const createUserService = async (reqBody: any, res: any) => {
    const data = await createUser(reqBody, res);
    let response;
    if (data && data.message) {
        const err = {
            error: data.message
        }
        logger.error(data.message);
        res.status(data.code).json(err);
    } else if (data) {
        response = {
            data: {
                id: data.id,
                email: data.email,
                role: data.role
            },
            error: null
        }
    }
    return response;
};

export const loginService = async (reqBody: any, res: any) => {
    const data: any = await login(reqBody, res);
    let response;
    if (data && typeof data === 'string') {
        response = {
            data: {
                token: data
            },
            error: null
        }
    } else if (data && data.message) {
        const err = {
            error: data.message
        }
        logger.error(data.message);
        res.status(data.code).json(err);
    }
    return response;
};
