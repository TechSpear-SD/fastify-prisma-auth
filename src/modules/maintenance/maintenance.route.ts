import type { FastifyInstance } from 'fastify';
import {
    maintenanceStateSchema,
    type MaintenanceRequestBody,
    type MaintenanceResponse,
} from './dto/maintenance-state.dto';

export default async function maintenanceRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: MaintenanceRequestBody; Reply: MaintenanceResponse }>(
        '/',
        { schema: maintenanceStateSchema },
        async (req, reply) => {
            const body = req.body as MaintenanceRequestBody;

            if (fastify.maintenance.enabled === body.enabled) {
                return reply.send({
                    enabled: fastify.maintenance.enabled,
                    startTime: fastify.maintenance.startTime?.toISOString() || null,
                });
            }

            fastify.maintenance.enabled = body.enabled;
            fastify.maintenance.startTime = body.enabled ? new Date() : null;

            reply.send({
                enabled: fastify.maintenance.enabled,
                startTime: fastify.maintenance.startTime?.toISOString() || null,
            });
        }
    );
}
