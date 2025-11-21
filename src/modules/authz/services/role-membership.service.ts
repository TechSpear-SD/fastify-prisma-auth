import type { FastifyInstance } from 'fastify';

export const createRoleMembershipService = (fastify: FastifyInstance) => ({
    getRoleMembers: async (roleId: number) => {
        const members = await fastify.prisma.roleMembership.findMany({
            where: { roleId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                        image: true,
                    },
                },
            },
        });
        return members.map((member) => member.user);
    },

    createRoleMembership: async (roleId: number, userId: string) => {
        await fastify.prisma.roleMembership.create({
            data: {
                roleId,
                userId,
            },
        });
    },
});
