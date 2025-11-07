export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: Record<string, any>;
    public readonly debugInfo?: Record<string, any>;

    constructor(
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true,
        details?: Record<string, any>,
        debugInfo?: Record<string, any>
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        this.debugInfo = debugInfo;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
