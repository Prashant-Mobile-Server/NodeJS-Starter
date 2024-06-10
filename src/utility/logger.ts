import winston from 'winston';
const { combine, timestamp, colorize, align, printf } = winston.format;
import 'dotenv/config'

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: 'ddd, DD MMM YYYY HH:mm:ss',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}${info.message}`)
    ),
    transports: [new winston.transports.Console()],
});