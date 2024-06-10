import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

type error = {
    message: string;
    code: number;
};

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    let error: error = {
        message: '',
        code: 0
    };

    if (!authHeader) {
        error.message = "Token is required";
        error.code = 401;
        return res.status(error.code).json(getResponse(error));
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        error.message = "Invalid Token";
        error.code = 403;
        return res.status(error.code).json(getResponse(error));
    }
    let data: any;
    try {
        console.log("process.env.TOKEN_KEY: ", process.env.TOKEN_KEY)
        data = jwt.verify(token, process.env.TOKEN_KEY);

        if (!data) {
            error.message = "No user with such email or password";
            error.code = 401;
            return res.status(error.code).json(getResponse(error));
        }
    } catch (err) {
        error.message = "Invalid Token";
        error.code = 401;
        return res.status(error.code).json(getResponse(error));
    }

    if (data) {
        next();
    } else {
        return res.status(error.code).json(getResponse(error));
    }
}

const getResponse = (error: error) => {
    const response = {
        "data": null,
        "error": {
            "message": error.message
        }
    }
    return response;
}