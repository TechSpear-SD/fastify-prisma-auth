import type { FastifyInstance } from 'fastify';
import {
    getRolesRequestQuerySchema,
    getRolesResponseSchema200,
    type GetRolesQueryString,
    type GetRolesReply,
} from '../dto/roles/get-roles.dto';
import {
    postRoleRequestBodySchema,
    postRoleResponseSchema200,
    type PostRoleReply,
    type PostRoleRequestBody,
} from '../dto/roles/post-role.dto';
import {
    deleteRoleRequestParamsSchema,
    deleteRoleResponseSchema204,
    type DeleteRoleReply,
    type DeleteRoleRequestParams,
} from '../dto/roles/delete-role';
import {
    getRoleByIdRequestParamsSchema,
    getRoleByIdResponseSchema200,
    type GetRoleByIdReply,
    type GetRoleByIdRequestParams,
} from '../dto/roles/get-role-by-id.dto';

import {
    patchRoleRequestBodySchema,
    patchRoleRequestParamsSchema,
    patchRoleResponseSchema204,
    type PatchRoleReply,
    type PatchRoleRequestBody,
    type PatchRoleRequestParams,
} from '../dto/roles/patch-role';
import {
    getRoleMembersRequestParamsSchema,
    getRoleMembersResponseSchema200,
    type GetRoleMembersReply,
    type GetRoleMembersRequestParams,
} from '../dto/roles/get-role-members';
import {
    postRoleMembershipBodySchema,
    postRoleMembershipParamsSchema,
    postRoleMembershipResponseSchema201,
    type PostRoleMembershipReply,
    type PostRoleMembershipRequestBody,
    type PostRoleMembershipRequestParams,
} from '../dto/roles/add-role-membership';
import {
    deleteRoleMembershipRequestParamsSchema,
    deleteRoleMembershipResponseSchema204,
    type deleteRoleMembershipReply,
    type deleteRoleMembershipRequestParams,
} from '../dto/roles/delete-role-membership';

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

    // Patch a role
    fastify.patch<{
        Params: PatchRoleRequestParams;
        Body: PatchRoleRequestBody;
        Reply: PatchRoleReply;
    }>(
        '/roles/:roleId',
        {
            schema: {
                params: patchRoleRequestParamsSchema,
                body: patchRoleRequestBodySchema,
                response: {
                    204: patchRoleResponseSchema204,
                },
            },
        },
        async (request, reply) => {
            const { roleId } = request.params;
            const { name, description } = request.body;

            await fastify.authz.roles.patchRole(roleId, name, description);

            return reply.code(204).send();
        }
    );

    fastify.get<{ Params: GetRoleMembersRequestParams; Reply: GetRoleMembersReply }>(
        '/roles/:roleId/members',
        {
            schema: {
                params: getRoleMembersRequestParamsSchema,
                response: {
                    200: getRoleMembersResponseSchema200,
                },
            },
        },
        async (request, reply) => {
            const { roleId } = request.params as { roleId: number };
            const members = await fastify.authz.roleMemberships.getRoleMembers(roleId);
            return reply.code(200).send(
                members.map((member) => ({
                    ...member,
                    createdAt: member.createdAt.toISOString(),
                    updatedAt: member.updatedAt.toISOString(),
                }))
            );
        }
    );

    fastify.post<{
        Params: PostRoleMembershipRequestParams;
        Body: PostRoleMembershipRequestBody;
        Reply: PostRoleMembershipReply;
    }>(
        '/roles/:roleId/members',
        {
            schema: {
                params: postRoleMembershipParamsSchema,
                body: postRoleMembershipBodySchema,
                response: {
                    201: postRoleMembershipResponseSchema201,
                },
            },
        },
        async (request, reply) => {
            const { roleId } = request.params;
            const { userId } = request.body;

            await fastify.authz.roleMemberships.createRoleMembership(roleId, userId);

            return reply.code(201).send();
        }
    );

    fastify.delete<{ Params: deleteRoleMembershipRequestParams; Reply: deleteRoleMembershipReply }>(
        '/roles/:roleId/members/:userId',
        {
            schema: {
                params: deleteRoleMembershipRequestParamsSchema,
                response: { 204: deleteRoleMembershipResponseSchema204 },
            },
        },
        async (request, reply) => {
            const { roleId, userId } = request.params as { roleId: number; userId: string };

            await fastify.authz.roleMemberships.deleteRoleMembership(roleId, userId);

            return reply.code(204).send();
        }
    );
}

/**
 * 

Role Membership (gestion des utilisateurs assignés au rôle)

GET /roles/:roleId/members – Liste les utilisateurs associés au rôle. : OK

POST /roles/:roleId/members – Associe un utilisateur au rôle. : OK

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
