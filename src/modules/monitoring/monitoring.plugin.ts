import { performance } from 'node:perf_hooks';

import fp from 'fastify-plugin';

export default fp(async (fastify) => {
    fastify.addHook('onRequest', async (req) => {
        req.startTime = performance.now();
    });

    fastify.addHook('onResponse', async (req, reply) => {
        const duration = performance.now() - req.startTime;
        req.duration = duration;
    });
});

declare module 'fastify' {
    export interface FastifyRequest {
        startTime: number;
        duration: number;
    }
}
