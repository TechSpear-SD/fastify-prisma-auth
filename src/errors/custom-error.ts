import { ErrorCodes } from './error-codes';

export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCodes;
    public readonly isOperational: boolean;
    public readonly details?: Record<string, unknown>;
    public readonly debugInfo?: Record<string, unknown>;

    constructor(
        message: string,
        statusCode: number = 500,
        code: ErrorCodes = ErrorCodes.INTERNAL_SERVER_ERROR,
        isOperational: boolean = true,
        details?: Record<string, unknown>,
        debugInfo?: Record<string, unknown>
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;
        this.details = details;
        this.debugInfo = debugInfo;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
