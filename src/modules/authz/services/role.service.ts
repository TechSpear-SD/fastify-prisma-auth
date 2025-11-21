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
});
