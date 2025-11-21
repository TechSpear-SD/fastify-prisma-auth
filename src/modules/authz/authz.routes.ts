import type { FastifyInstance } from 'fastify';
import { permissionsRoutes } from './routes/permissions.routes';
import { rolesRoutes } from './routes/roles.routes';

export default async function authzRoutes(fastify: FastifyInstance) {
    await permissionsRoutes(fastify);
    await rolesRoutes(fastify);
}
