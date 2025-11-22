import type { FromSchema } from 'json-schema-to-ts';

export const deleteOrganizationMembershipRequestParamsSchema = {
    type: 'object',
    properties: {
        organizationId: { type: 'string' },
        userId: { type: 'string' },
    },
    required: ['organizationId', 'userId'],
} as const;

export const deleteOrganizationMembershipResponseSchema204 = {
    type: 'object',
    properties: {},
    required: [],
} as const;

export type DeleteOrganizationMembershipRequestParams = FromSchema<
    typeof deleteOrganizationMembershipRequestParamsSchema
>;
type DeleteOrganizationMembershipResponseSchema204 = FromSchema<
    typeof deleteOrganizationMembershipResponseSchema204
>;
export type DeleteOrganizationMembershipReply = {
    204: DeleteOrganizationMembershipResponseSchema204;
};
