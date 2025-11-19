import { prisma } from '../../plugins/prisma';
import { cacheGet, cacheSet } from './cache';
import { getUserRoleMemberships } from './services/role-membership.service';
import type { EvaluatedPermission } from './types';

/**
 * Resolve the permissions for a given user. It first checks the cache; if not found,
 * it queries the database for the user's role memberships and their associated permissions.
 * It then constructs a list of evaluated permissions, considering role scopes and inherited roles,
 * before caching and returning the result.
 *
 */
export async function resolveUserPermissions(userId: string): Promise<EvaluatedPermission[]> {
    const cacheKey = `perm:${userId}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const roleMemberships = await getUserRoleMemberships(userId);

    const perms: EvaluatedPermission[] = [];

    for (const membership of roleMemberships) {
        const roleScope = membership.organizationId;
        const role = membership.role;

        for (const rp of role.permissions) {
            perms.push({
                action: rp.permission.action,
                resource: rp.permission.resource,
                policy: rp.policy?.definition ?? null,
                roleId: role.id,
                organizationId: roleScope ?? role.organizationId,
            });
        }

        for (const inherit of role.parentRoles) {
            for (const rp of inherit.parent.permissions) {
                perms.push({
                    action: rp.permission.action,
                    resource: rp.permission.resource,
                    policy: rp.policy?.definition ?? null,
                    roleId: inherit.parent.id,
                    organizationId: roleScope ?? inherit.parent.organizationId,
                });
            }
        }
    }

    cacheSet(cacheKey, perms);
    return perms;
}

async function getAllParentPermissions(roleId: string, visited = new Set<string>()) {
    if (visited.has(roleId)) return [];
    visited.add(roleId);

    const role = await prisma.role.findUnique({
        where: { id: roleId },
        include: {
            permissions: { include: { permission: true, policy: true } },
            parentRoles: { include: { parent: true } },
        },
    });

    let perms = role?.permissions ?? [];

    if (role?.parentRoles) {
        for (const pr of role.parentRoles) {
            perms = perms.concat(await getAllParentPermissions(pr.parentId, visited));
        }
    }

    const uniquePerms = Array.from(new Map(perms.map((p) => [p.permissionId, p])).values());
    return uniquePerms;
}
