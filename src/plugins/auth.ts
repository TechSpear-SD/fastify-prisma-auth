import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { FastifyInstance } from 'fastify';
import { prisma } from './prisma';
import fp from 'fastify-plugin';

export const authPlugin = fp(async (fastify: FastifyInstance) => {
    const auth = betterAuth({
        database: prismaAdapter(prisma, {
            provider: 'postgresql',
        }),
        emailAndPassword: {
            enabled: true,
        },
    });

    fastify.decorate('auth', auth);
});

declare module 'fastify' {
    interface FastifyInstance {
        auth: ReturnType<typeof betterAuth>;
    }
}
