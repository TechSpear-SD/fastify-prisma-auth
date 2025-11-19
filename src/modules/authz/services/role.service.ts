import type { FastifyInstance } from 'fastify';

export const createRoleService = (fastify: FastifyInstance) => ({
    getRoles: async () => {
        fastify.prisma.role.findMany();
    },
});
