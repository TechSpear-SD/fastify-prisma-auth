import fp from 'fastify-plugin';
import maintenanceRoutes from './maintenance.route';
import maintenancePlugin from './maintenance.plugin';

export const maintenanceModule = fp(async (fastify) => {
    await fastify.register(maintenancePlugin);
    await fastify.register(maintenanceRoutes, { prefix: '/maintenance' });
});
