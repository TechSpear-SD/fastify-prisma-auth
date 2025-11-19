import { performance } from 'node:perf_hooks';

import type { FastifyInstance } from 'fastify';

export default async function monitoringPlugin(fastify: FastifyInstance) {
    fastify.addHook('onRequest', async (req) => {
        req.startTime = performance.now();
    });

    fastify.addHook('onResponse', async (req, _reply) => {
        const duration = performance.now() - req.startTime;
        req.duration = duration;
    });
}

declare module 'fastify' {
    export interface FastifyRequest {
        startTime: number;
        duration: number;
    }
}
