import { CustomError } from './custom-error';
import { ErrorCodes } from './error-codes';

type CatchHandler = (err: any) => never | void;

/**
 * A utility function that wraps asynchronous operations in a try-catch block.
 * If an error occurs and it's not a CustomError, it either invokes the provided
 * catchHandler or throws a new CustomError with a generic message.
 *
 * @param fn - The asynchronous function to execute.
 * @param catchHandler - An optional function to handle non-CustomError exceptions.
 * @returns The result of the asynchronous function if successful.
 * @throws CustomError if an unexpected error occurs.
 */
export async function tryCatch<T>(fn: () => Promise<T>, catchHandler?: CatchHandler): Promise<T> {
    try {
        return await fn();
    } catch (err: any) {
        if (err instanceof CustomError) throw err;

        if (catchHandler) {
            const result = catchHandler(err);
            if (result !== undefined) {
                return result as T;
            }
        }

        throw new CustomError(
            'Unexpected internal error',
            500,
            ErrorCodes.INTERNAL_SERVER_ERROR,
            false,
            undefined,
            {
                originalError: err,
            }
        );
    }
}
