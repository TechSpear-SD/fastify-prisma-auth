import type { FastifyInstance } from 'fastify';
import {
    postMaintenanceStateBodySchema,
    postMaintenanceStateResponseSchema,
    type PostMaintenanceBody,
    type PostMaintenanceReply,
} from './dto/post-maintenance-state.dto';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export default async function maintenanceRoutes(fastify: FastifyInstance) {
    const app = fastify.withTypeProvider<JsonSchemaToTsProvider>();

    app.post<{
        Body: PostMaintenanceBody;
        Reply: PostMaintenanceReply;
    }>(
        '/',
        {
            schema: {
                body: postMaintenanceStateBodySchema,
                response: {
                    200: postMaintenanceStateResponseSchema,
                },
            },
        },
        async (req, reply) => {
            const { enabled } = req.body;

            if (fastify.maintenance.enabled === enabled) {
                return reply.code(200).send({
                    enabled: fastify.maintenance.enabled,
                    startTime: fastify.maintenance.startTime?.toISOString() || null,
                });
            }

            fastify.maintenance.enabled = enabled;
            fastify.maintenance.startTime = enabled ? new Date() : null;

            reply.code(200).send({
                enabled: fastify.maintenance.enabled,
                startTime: fastify.maintenance.startTime?.toISOString() || null,
            });
        }
    );
}
