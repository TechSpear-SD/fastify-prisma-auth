import { CustomError } from './custom-error';
import { ErrorCodes } from './error-codes';

export class MaintenanceError extends CustomError {
    constructor(
        message = 'Maintenance mode is enabled',
        details?: Record<string, unknown>,
        debugInfo?: Record<string, unknown>,
        isOperational = true
    ) {
        super(message, 503, ErrorCodes.MAINTENANCE, isOperational, details, debugInfo);
    }
}
