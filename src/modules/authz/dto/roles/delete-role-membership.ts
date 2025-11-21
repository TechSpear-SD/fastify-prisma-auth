import type { FromSchema } from 'json-schema-to-ts';

export const deleteRoleMembershipRequestParamsSchema = {
    type: 'object',
    properties: {
        roleId: { type: 'number' },
        userId: { type: 'string' },
    },
    required: ['roleId', 'userId'],
} as const;

export const deleteRoleMembershipResponseSchema204 = {
    type: 'object',
    properties: {},
    required: [],
} as const;

export type deleteRoleMembershipRequestParams = FromSchema<
    typeof deleteRoleMembershipRequestParamsSchema
>;
type deleteRoleMembershipResponseSchema204 = FromSchema<
    typeof deleteRoleMembershipResponseSchema204
>;
export type deleteRoleMembershipReply = {
    204: deleteRoleMembershipResponseSchema204;
};
