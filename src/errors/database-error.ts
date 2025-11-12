import { CustomError } from './custom-error';
import { ErrorCodes } from './error-codes';

export class DatabaseError extends CustomError {
    constructor(
        message = 'Database error',
        details?: Record<string, unknown>,
        debugInfo?: Record<string, unknown>,
        isOperational = true
    ) {
        super(message, 400, ErrorCodes.DATABASE_ERROR, isOperational, details, debugInfo);
    }
}
