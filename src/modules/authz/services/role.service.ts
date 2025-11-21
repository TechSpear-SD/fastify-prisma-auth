import type { FastifyInstance } from 'fastify';

export const createRoleService = (fastify: FastifyInstance) => ({
    /**
     * @param organizationId Optionnal param
     * @returns An organization's roles or global roles if organizationId is null
     */
    getRoles: async (organizationId: string) => {
        return fastify.prisma.role.findMany({
            where: {
                organizationId: organizationId,
            },
        });
    },

    getRoleByIdOrThrow: async (roleId: number) => {
        return fastify.prisma.role.findUniqueOrThrow({
            where: {
                id: roleId,
            },
        });
    },

    createRole: async (organizationId: string, name: string, description: string) => {
        return fastify.prisma.role.create({
            data: {
                name,
                description,
                organizationId,
            },
        });
    },

    deleteRole: async (roleId: number) => {
        await fastify.prisma.role.delete({
            where: {
                id: roleId,
            },
        });
    },
});
