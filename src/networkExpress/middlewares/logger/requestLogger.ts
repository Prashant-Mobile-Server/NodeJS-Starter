import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import { logger } from '../../../utility/logger';

export async function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.debug(`${req.method} ${req.originalUrl}`)
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.originalUrl} - ${duration}ms`)
    });
    next();
}