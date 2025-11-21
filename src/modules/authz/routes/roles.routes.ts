import type { FastifyInstance } from 'fastify';
import {
    getRolesRequestQuerySchema,
    getRolesResponseSchema200,
    type GetRolesQueryString,
    type GetRolesReply,
} from '../dto/roles/getRoles.dto';
import {
    postRoleRequestBodySchema,
    postRoleResponseSchema200,
    type PostRoleReply,
    type PostRoleRequestBody,
} from '../dto/roles/postRole.dto';
import {
    deleteRoleRequestParamsSchema,
    deleteRoleResponseSchema204,
    type DeleteRoleReply,
    type DeleteRoleRequestParams,
} from '../dto/roles/deleteRole';
import {
    getRoleByIdRequestParamsSchema,
    getRoleByIdResponseSchema200,
    type GetRoleByIdReply,
    type GetRoleByIdRequestParams,
} from '../dto/roles/getRoleById.dto';

export async function rolesRoutes(fastify: FastifyInstance) {
    // Get all roles for an organization
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

    // Create a new role
    fastify.post<{ Body: PostRoleRequestBody; Reply: PostRoleReply }>(
        '/roles',
        {
            schema: {
                body: postRoleRequestBodySchema,
                response: {
                    200: postRoleResponseSchema200,
                },
            },
        },
        async (request, reply) => {
            const { organizationId, name, description } = request.body;
            const role = await fastify.authz.roles.createRole(organizationId, name, description);
            return reply.code(200).send([
                {
                    ...role,
                    createdAt: role.createdAt.toISOString(),
                },
            ]);
        }
    );

    // Delete a role
    fastify.delete<{ Params: DeleteRoleRequestParams; Reply: DeleteRoleReply }>(
        '/roles/:roleId',
        {
            schema: {
                params: deleteRoleRequestParamsSchema,
                response: { 204: deleteRoleResponseSchema204 },
            },
        },
        async (request, reply) => {
            const { roleId } = request.params;
            await fastify.authz.roles.deleteRole(roleId);
            return reply.code(204).send();
        }
    );

    // Get role by ID
    fastify.get<{ Params: GetRoleByIdRequestParams; Reply: GetRoleByIdReply }>(
        '/roles/:roleId',
        {
            schema: {
                params: getRoleByIdRequestParamsSchema,
                response: {
                    200: getRoleByIdResponseSchema200,
                },
            },
        },
        async (request, reply) => {
            const { roleId } = request.params;

            const role = await fastify.authz.roles.getRoleByIdOrThrow(roleId);

            return reply.code(200).send({
                ...role,
                createdAt: role.createdAt.toISOString(),
            });
        }
    );
}

/**
 * 
GET /roles – Liste tous les rôles d’une organisation donnée. : OK

POST /roles – Crée un nouveau rôle pour une organisation. : OK

GET /roles/:roleId – Récupère les détails d’un rôle.

PATCH /roles/:roleId – Met à jour un rôle.

DELETE /roles/:roleId – Supprime un rôle. : OK

Role Membership (gestion des utilisateurs assignés au rôle)

GET /roles/:roleId/members – Liste les utilisateurs associés au rôle.

POST /roles/:roleId/members – Associe un utilisateur au rôle.

DELETE /roles/:roleId/members/:userId – Retire un utilisateur du rôle.

Role Permissions (gestion des permissions du rôle)

GET /roles/:roleId/permissions – Liste les permissions attachées au rôle.

POST /roles/:roleId/permissions – Ajoute une permission au rôle.

DELETE /roles/:roleId/permissions/:permissionId – Retire une permission du rôle.

Role Hierarchy (héritage entre rôles)

GET /roles/:roleId/parents – Liste les rôles dont ce rôle hérite.

POST /roles/:roleId/parents – Ajoute un rôle parent (héritage).

DELETE /roles/:roleId/parents/:parentRoleId – Retire un rôle parent.

GET /roles/:roleId/children – Liste les rôles qui héritent de ce rôle.

POST /roles/:roleId/children – Ajoute un rôle enfant.

DELETE /roles/:roleId/children/:childRoleId – Retire un rôle enfant.
 */
