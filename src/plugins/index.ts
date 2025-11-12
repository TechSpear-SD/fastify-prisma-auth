import type { FastifyInstance } from 'fastify';

import { prismaPlugin } from './prisma';
import { authPlugin } from './auth';
import { corsPlugin } from './cors';
import { correlationPlugin } from './correlation-plugin';
import { configPlugin } from './config';
import fastifyHelmet from '@fastify/helmet';

export async function registerGlobalPlugins(app: FastifyInstance) {
    await app.register(corsPlugin);
    await app.register(prismaPlugin);
    await app.register(authPlugin);
    await app.register(correlationPlugin);
    await app.register(configPlugin);
    await app.register(fastifyHelmet);
}
