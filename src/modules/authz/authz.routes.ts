import type { FastifyInstance } from 'fastify';
import { NotImplementedError } from '../../errors/not-implemented.error';

export default async function authzRoutes(fastify: FastifyInstance) {
    fastify.get('/roles', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.post('/roles', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.get('/roles/:id', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.put('/roles/:id', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.delete('/roles/:id', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.get('/permissions', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.post('/permissions', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.delete('/permissions/:id', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.post('/users/:id/roles', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.delete('/users/:id/roles/:roleId', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.get('/users/:id/roles', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.get('/policies', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.post('/policies', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.get('/policies/:id', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.put('/policies/:id', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.delete('/policies/:id', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.get('/attributes', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.post('/users/:id/permissions', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.delete('/users/:id/permissions/:permission', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.get('/users/:id/permissions', async (request, reply) => {
        throw new NotImplementedError();
    });

    fastify.get('/authz/check', async (request, reply) => {
        throw new NotImplementedError();
    });
    fastify.post('/authz/check', async (request, reply) => {
        throw new NotImplementedError();
    });
}
