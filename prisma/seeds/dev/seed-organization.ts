import { Organization, PrismaClient } from '../../../src/generated/prisma/client';

export const GLOBAL_ORG_ID = '00000000-0000-0000-0000-000000000000';
export const GLOBAL_ORG_SLUG = 'global-organization';

const organizations: Omit<Organization, 'createdAt' | 'updatedAt'>[] = [
    {
        id: GLOBAL_ORG_ID,
        slug: GLOBAL_ORG_SLUG,
        name: 'Global Organization',
    },
    {
        id: '11111111-1111-1111-1111-111111111111',
        slug: 'dev-org',
        name: 'Development Organization',
    },
];

export async function seedOrganizations(prisma: PrismaClient) {
    console.log('Seeding organizations...');

    for (const org of organizations) {
        await prisma.organization.upsert({
            where: { id: org.id },
            update: {},
            create: org,
        });
    }

    console.log('Organizations seeded.');
}
