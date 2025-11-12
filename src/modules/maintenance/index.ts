import fp from 'fastify-plugin';
import maintenanceRoutes from './maintenance.route';
import maintenancePlugin from './maintenance.plugin';

export interface MaintenancePluginOptions {
    ignoreRoutes?: string[];
}

export const maintenanceModule = fp(async (fastify, opts: MaintenancePluginOptions) => {
    await fastify.register(maintenancePlugin, opts);
    await fastify.register(maintenanceRoutes, { prefix: '/maintenance' });
});
