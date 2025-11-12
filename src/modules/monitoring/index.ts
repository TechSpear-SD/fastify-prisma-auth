import fp from 'fastify-plugin';

import monitoringRoutes from './monitoring.route';

/**
 * We need this inner module because Fastify ignores `prefix` (and other options)
 * when a plugin is wrapped with `fastify-plugin`. To make the prefix work,
 * we register the actual routes inside a nested plugin that is not wrapped
 * with `fastify-plugin`, then export an outer plugin (wrapped with fp) that
 * applies the prefix and handles encapsulation properly.
 */

async function monitoringModuleInner(fastify: any) {
    await monitoringRoutes(fastify);
}

export const monitoringModule = fp(async (fastify) => {
    fastify.register(monitoringModuleInner, { prefix: '/monitoring' });
});
