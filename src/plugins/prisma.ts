import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const prismaPlugin = fp(async (fastify: FastifyInstance) => {
    await prisma.$connect();
    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', async () => {
        await prisma.$disconnect();
    });
});

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

export { prisma };
