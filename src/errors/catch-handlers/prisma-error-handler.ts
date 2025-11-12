import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';

import { DatabaseError } from '../database-error';

/**
 * Transforme une erreur Prisma en DatabaseError opérationnelle
 */
export function prismaCatchHandler(err: unknown) {
    if (err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(
            'Database constraint error',
            undefined,
            { originalError: err.message },
            true
        );
    }
}
