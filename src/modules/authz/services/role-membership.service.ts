import type { FastifyInstance } from 'fastify';

export const createRoleMembershipService = (fastify: FastifyInstance) => ({});

// /**
//  * Returns all role memberships for a user
//  *
//  * @param userId
//  * @returns
//  */
// export async function getUserRoleMemberships(userId: string) {
//     return prisma.roleMembership.findMany({
//         where: { userId },
//         include: {
//             role: {
//                 include: {
//                     permissions: {
//                         include: {
//                             permission: true,
//                             policy: true,
//                         },
//                     },
//                     parentRoles: {
//                         include: {
//                             parent: {
//                                 include: {
//                                     permissions: {
//                                         include: {
//                                             permission: true,
//                                             policy: true,
//                                         },
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     });
// }
