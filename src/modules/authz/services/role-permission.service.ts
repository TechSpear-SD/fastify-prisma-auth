import type { FastifyInstance } from 'fastify';

export const createRolePermissionService = (fastify: FastifyInstance) => ({
    getRolePermissions: async (roleId: number) => {
        const permissions = await fastify.prisma.rolePermission.findMany({
            where: { roleId },
            include: {
                permission: true,
            },
        });
        return permissions.map((rp) => rp.permission);
    },

    createRolePermission: async (roleId: number, permissionId: number) => {
        await fastify.prisma.rolePermission.create({
            data: {
                roleId,
                permissionId,
            },
        });
    },

    deleteRolePermission: async (roleId: number, permissionId: number) => {
        await fastify.prisma.rolePermission.delete({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
        });
    },
});
