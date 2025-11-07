import { CustomError } from './custom-error';

export class DatabaseError extends CustomError {
    constructor(message = 'Database error', details?: any, debugInfo?: any, isOperational = true) {
        super(message, 400, isOperational, details, debugInfo);
    }
}
