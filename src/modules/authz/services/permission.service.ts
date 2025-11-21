import type { FastifyInstance } from 'fastify';
import type { PermissionAction } from '../permission-action';

export const createPermissionService = (fastify: FastifyInstance) => ({
    getPermissionById: async (id: number) => {
        return fastify.prisma.permission.findUniqueOrThrow({
            where: { id },
        });
    },

    getPermission(action: PermissionAction, resource?: string) {
        if (!resource) {
            return fastify.prisma.permission.findFirst({
                where: { action },
            });
        }

        return fastify.prisma.permission.findUnique({
            where: {
                action_resource: {
                    action: action,
                    resource: resource,
                },
            },
        });
    },

    getPermissions: async () => {
        return fastify.prisma.permission.findMany();
    },
});
