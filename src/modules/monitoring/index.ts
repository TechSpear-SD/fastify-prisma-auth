import fp from 'fastify-plugin';

import monitoringRoutes from './monitoring.route';
import monitoringPlugin from './monitoring.plugin';

export interface MonitoringPluginOptions {
    prefix?: string;
}

export const monitoringModule = fp(async (fastify, opts: MonitoringPluginOptions) => {
    await fastify.register(monitoringPlugin);
    await fastify.register(monitoringRoutes, { prefix: opts.prefix ?? '/monitoring' });
});
