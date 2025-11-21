import type { AuthContext } from './types';

export async function userCan(
    userId: string,
    action: string,
    context: AuthContext = {}
): Promise<boolean> {
    // const permissions = await resolveUserPermissions(userId);
    // for (const permission of permissions) {
    //     if (permission.action !== action) {
    //         continue;
    //     }
    //     if (permission.organizationId && context.organizationId !== permission.organizationId) {
    //         continue;
    //     }
    //     // TODO : evaluate policy
    //     // if (!evaluatePolicy(p.policy, { ...context, userId })) continue;
    //     return true;
    // }
    // return false;
    return true;
}

export async function assertUserCan(userId: string, action: string, context: AuthContext = {}) {
    // const ok = await userCan(userId, action, context);
    // if (!ok) {
    //     const orgInfo = context.organizationId ? ` (org ${context.organizationId})` : '';
    //     throw new Error(`Forbidden: ${action}${orgInfo}`);
    // }
}
