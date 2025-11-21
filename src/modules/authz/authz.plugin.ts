import type { FastifyInstance } from 'fastify';
import { assertUserCan, userCan } from './evaluator';
import { createRoleService } from './services/role.service';
import { createPermissionService } from './services/permission.service';
import fp from 'fastify-plugin';
import { createRoleMembershipService } from './services/role-membership.service';

async function authzPlugin(fastify: FastifyInstance) {
    fastify.decorate('authz', {
        can:
            (userId: string) =>
            async (action: string, ctx: any = {}) =>
                userCan(userId, action, ctx),
        assertCan:
            (userId: string) =>
            async (action: string, ctx: any = {}) =>
                assertUserCan(userId, action, ctx),
        roles: createRoleService(fastify),
        permissions: createPermissionService(fastify),
        roleMemberships: createRoleMembershipService(fastify),
    });
}

declare module 'fastify' {
    interface FastifyInstance {
        authz: {
            can: (userId: string) => (action: string, ctx?: any) => Promise<boolean>;
            assertCan: (userId: string) => (action: string, ctx?: any) => Promise<void>;
            roles: ReturnType<typeof createRoleService>;
            permissions: ReturnType<typeof createPermissionService>;
            roleMemberships: ReturnType<typeof createRoleMembershipService>;
        };
    }
}

export default fp(authzPlugin, { name: 'authz-plugin' });
