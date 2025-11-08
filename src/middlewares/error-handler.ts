import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../errors/custom-error';

export async function errorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const handler = new ErrorHandler(request, reply);
    return handler.handle(error);
}

export class ErrorHandler {
    constructor(
        private request: FastifyRequest,
        private reply: FastifyReply
    ) {}

    public handle(error: FastifyError) {
        this.logError(error);
        this.alertIfCritical(error);

        if (error instanceof CustomError && error.isOperational) {
            return this.sendResponse(error);
        }

        return this.sendUnknownError();
    }

    private logError(error: FastifyError) {
        const isCustomError = error instanceof CustomError;

        const logData = {
            message: error.message,
            stack: error.stack,
            url: this.request.url,
            method: this.request.method,
            params: this.request.params,
            query: this.request.query,
            body: this.request.body,
            headers: this.request.headers,
            ...(isCustomError
                ? {
                      error: error.name,
                      code: error.code,
                      statusCode: error.statusCode,
                      isOperational: error.isOperational,
                      details: error.details,
                      debugInfo: error.debugInfo,
                  }
                : {}),
        };

        this.request.log.error(logData);
    }

    private sendResponse(error: CustomError) {
        return this.reply.status(error.statusCode).send({
            status: error.statusCode,
            code: error.code,
            message: error.message,
            details: error.details,
        });
    }

    private sendUnknownError() {
        return this.reply.status(500).send({
            status: 500,
            code: 'INTERNAL_ERROR',
            message: 'Internal Server Error',
        });
    }

    private alertIfCritical(error: FastifyError) {
        if (!(error instanceof CustomError) || !error.isOperational) {
        }
    }
}
