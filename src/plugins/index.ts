import type { FastifyInstance } from 'fastify';

import { prismaPlugin } from './prisma';
import { corsPlugin } from './cors';
import { correlationPlugin } from './correlation-plugin';
import fastifyHelmet from '@fastify/helmet';

export async function registerGlobalPlugins(app: FastifyInstance) {
    await app.register(prismaPlugin);
    await app.register(corsPlugin);
    await app.register(correlationPlugin);
    await app.register(fastifyHelmet);
}
