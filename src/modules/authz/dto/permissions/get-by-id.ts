import type { FromSchema } from 'json-schema-to-ts';

export const getPermissionByIdParamSchema = {
    type: 'object',
    properties: {
        permissionId: { type: 'string' },
    },
    required: ['permissionId'],
} as const;

export const getPermissionByIdResponseSchema200 = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        action: { type: 'string' },
        resource: { type: 'string' },
        description: { type: ['string', 'null'] },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'action', 'resource', 'description', 'createdAt'],
} as const;

export type GetPermissionByIdParams = FromSchema<typeof getPermissionByIdParamSchema>;

type GetPermissionByIdResponse200 = FromSchema<typeof getPermissionByIdResponseSchema200>;

export type GetPermissionByIdReply = {
    200: GetPermissionByIdResponse200;
};
