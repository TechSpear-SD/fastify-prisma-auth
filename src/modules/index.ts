import type { FastifyInstance } from 'fastify';

import { monitoringModule } from './monitoring';

export async function registerModules(fastify: FastifyInstance) {
    fastify.register(monitoringModule, { prefix: '/monitoring' });
}
