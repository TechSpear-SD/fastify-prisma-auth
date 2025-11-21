import type { FastifyInstance } from 'fastify';
import {
    getRolesRequestQuerySchema,
    getRolesResponseSchema200,
    type GetRolesQueryString,
    type GetRolesReply,
} from '../dto/roles/getRoles.dto';

export async function rolesRoutes(fastify: FastifyInstance) {
    fastify.get<{ Querystring: GetRolesQueryString; Reply: GetRolesReply }>(
        '/roles',
        {
            schema: {
                querystring: getRolesRequestQuerySchema,
                response: {
                    200: getRolesResponseSchema200,
                },
            },
        },
        async (request, reply) => {
            const { organizationId } = request.query;
            const roles = await fastify.authz.roles.getRoles(organizationId);
            return reply.code(200).send(
                roles.map((role) => ({
                    ...role,
                    createdAt: role.createdAt.toISOString(),
                }))
            );
        }
    );
}
