import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required()
});


export function validateCartReq(req: Request, res: Response, next: NextFunction): void {

    const { error, value } = schema.validate(req.body);

    if (error) {
        const response = {
            "data": null,
            "error": {
                "message": error.details[0].message
            }
        }
        res.status(401).json(response);
    } else {
        next();
    }
}