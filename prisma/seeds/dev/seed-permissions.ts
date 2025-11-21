import { PrismaClient } from '../../../src/generated/prisma/client';
import { PermissionAction } from '../../../src/modules/authz/permission-action';
import { PermissionResource } from '../../../src/modules/authz/permission-resource';

const permissions = [
    { action: PermissionAction.READ, resource: PermissionResource.PERMISSIONS },
    { action: PermissionAction.READ, resource: PermissionResource.GLOBAL_ROLES },
];

export async function seedPermissions(prisma: PrismaClient) {
    console.log('Seeding permissions...');
    for (const { action, resource } of permissions) {
        await prisma.permission.upsert({
            where: { action_resource: { action, resource } },
            update: {},
            create: {
                action: action,
                resource: resource,
            },
        });
    }
    console.log('Permissions seeded.');
}
