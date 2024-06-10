import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../../entities/user.entity';
import { getUserById } from '../../dataMongo/user.data';

export async function authoriseUser(req: Request, res: Response, next: NextFunction) {

    const userId = req.headers['x-user-id'];
    const user: UserEntity | undefined = await getUserById(userId);
    if (user && user.role === "admin") {
        next();
    } else {
        const response = {
            "data": null,
            "error": {
                "message": "Forbidden"
            }
        }
        return res.status(403).json(response);
    }
}