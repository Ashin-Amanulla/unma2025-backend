import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Create the logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'unma-registration-api' },
    transports: [
        // Write all logs to console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ level, message, timestamp, ...metadata }) => {
                        let metaStr = '';
                        if (Object.keys(metadata).length > 0 && metadata.service) {
                            metaStr = JSON.stringify(metadata);
                        }
                        return `${timestamp} [${level}]: ${message} ${metaStr}`;
                    }
                )
            ),
        }),
        // Write to all logs with level 'info' and below to combined.log
        new winston.transports.File({ filename: 'logs/combined.log' }),
        // Write all logs with level 'error' and below to error.log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
    exitOnError: false,
});

// Create a stream object with a 'write' function that will be used by morgan
const stream = {
    write: (message) => {
        // Remove newline character from morgan logging
        logger.info(message.trim());
    },
};

// Log unhandled exceptions and rejections
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    // Give the logger time to write to files before exiting
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Rejection:', error);
});

// Export both the logger instance and the setup function for flexibility
export { logger,stream };
export const setupLogger = () => {
    return logger;
}; 