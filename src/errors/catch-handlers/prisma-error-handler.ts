import { DatabaseError } from '../database-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';

/**
 * Transforme une erreur Prisma en DatabaseError opérationnelle
 */
export function prismaCatchHandler(err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(
            'Database constraint error',
            undefined,
            { originalError: err.message },
            true
        );
    }
}
