import type { FastifySchema } from 'fastify';

export const getRolesSchema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            global: { type: 'boolean', default: false },
        },
        required: [],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    scope: { type: 'string', enum: ['global', 'organization'] },
                },
                required: ['id', 'name', 'scope'],
            },
        },
    },
};
