import fp from 'fastify-plugin';

import monitoringRoutes from './monitoring.route';
import monitoringPlugin from './monitoring.plugin';

export const monitoringModule = fp(async (fastify) => {
    await fastify.register(monitoringPlugin);
    await fastify.register(monitoringRoutes, { prefix: '/monitoring' });
});
