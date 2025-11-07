import { prismaPlugin } from './prisma';
import { authPlugin } from './auth';
import type { FastifyInstance } from 'fastify';
import { corsPlugin } from './cors';

export async function registerPlugins(app: FastifyInstance) {
    await app.register(corsPlugin);
    await app.register(prismaPlugin);
    await app.register(authPlugin);
}
