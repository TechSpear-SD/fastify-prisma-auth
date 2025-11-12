import type { FastifyInstance } from 'fastify';

import { monitoringModule } from './monitoring';
import { maintenanceModule } from './maintenance';

export async function registerModules(fastify: FastifyInstance) {
    fastify.register(maintenanceModule, {
        prefix: '/maintenance',
        ignoreRoutes: ['/monitoring/health', '/monitoring/version'],
    });
    fastify.register(monitoringModule, { prefix: '/monitoring' });
}
