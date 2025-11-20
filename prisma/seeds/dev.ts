import { PrismaClient } from '@prisma/client';
import { seedPermissions } from './dev/seed-permissions';

export async function seedDev(prisma: PrismaClient) {
    await seedPermissions(prisma);
}
