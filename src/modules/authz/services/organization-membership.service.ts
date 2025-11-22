import type { FastifyInstance } from 'fastify';

export const createOrganizationMembershipService = (fastify: FastifyInstance) => ({
    async createOrganizationMembership(organizationId: string, userId: string) {
        return await fastify.prisma.organizationMembership.create({
            data: {
                organizationId,
                userId,
            },
        });
    },

    async deleteOrganizationMembership(organizationId: string, userId: string) {
        return await fastify.prisma.organizationMembership.delete({
            where: {
                userId_organizationId: {
                    organizationId,
                    userId,
                },
            },
        });
    },

    // Retrieves all members of an organization along with their user details and roles
    // We make sure to filter the organizationId on both organizationMembership and roleMemberships to ensure we don't leak roles
    async getOrganizationMembers(organizationId: string) {
        const members = await fastify.prisma.organizationMembership.findMany({
            where: { organizationId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                        roleMemberships: {
                            where: {
                                role: { organizationId },
                            },
                            include: {
                                role: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true,
                                        createdAt: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return members.map((member) => ({
            ...member.user,
            roles: member.user.roleMemberships.map((rm) => rm.role),
            roleMemberships: undefined,
        }));
    },
});
