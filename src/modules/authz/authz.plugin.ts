import type { FastifyInstance } from 'fastify';
import { assertUserCan, userCan } from './evaluator';
import { createRoleService } from './services/role.service';

export default async function authzPlugin(fastify: FastifyInstance) {
    fastify.decorate('authz', {
        can:
            (userId: string) =>
            async (action: string, ctx: any = {}) =>
                userCan(userId, action, ctx),
        assertCan:
            (userId: string) =>
            async (action: string, ctx: any = {}) =>
                assertUserCan(userId, action, ctx),
        role: createRoleService(fastify),
    });
}

declare module 'fastify' {
    interface FastifyInstance {
        authz: {
            can: (userId: string) => (action: string, ctx?: any) => Promise<boolean>;
            assertCan: (userId: string) => (action: string, ctx?: any) => Promise<void>;
        };
    }
}
