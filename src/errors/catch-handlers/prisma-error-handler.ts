import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';

import { DatabaseError } from '../database-error';
import type { CustomError } from '../custom-error';
import z from 'zod';

const prismaErrorSchema = z.object({
    name: z.string(),
    code: z.string(),
    message: z.string(),
});

/**
 * Transforms Prisma known request errors into DatabaseError instances.
 *
 * @param err - The error to handle.
 * @returns A DatabaseError if the error matches known Prisma errors, otherwise undefined.
 */
export function prismaCatchHandler(err: unknown): CustomError | undefined {
    const parseResult = prismaErrorSchema.safeParse(err);

    if (parseResult.success) {
        const parsedError = parseResult.data;

        if (parsedError.code === 'P1017') {
            return new DatabaseError(
                'Database constraint error',
                undefined,
                {
                    originalError: {
                        name: parsedError.name,
                        code: parsedError.code,
                        message: parsedError.message,
                    },
                },
                true
            );
        }
    }

    return undefined;
}
