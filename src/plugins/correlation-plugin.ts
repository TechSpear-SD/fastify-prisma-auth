import { randomUUID } from 'node:crypto';

import fp from 'fastify-plugin';

import { asyncLocalStorage } from '../utils/context';

/**
 * A Fastify plugin that assigns a unique correlation ID to each incoming request.
 * This ID is stored in an AsyncLocalStorage context and added to the request logger for traceability.
 */
export const correlationPlugin = fp(async (fastify) => {
    fastify.addHook('onRequest', (req, reply, done) => {
        const correlationId = req.headers['x-correlation-id']?.toString() || randomUUID();

        asyncLocalStorage.run({ correlationId }, () => {
            req.log = req.log.child({ correlationId });
            done();
        });
    });
});
