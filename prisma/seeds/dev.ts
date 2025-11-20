import { seedPermissions } from './dev/seed-permissions';
import { PrismaClient } from '../../src/generated/prisma/client';

export async function seedDev(prisma: PrismaClient) {
    await seedPermissions(prisma);
}
