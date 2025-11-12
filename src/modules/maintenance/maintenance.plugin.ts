import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { MaintenanceError } from '../../errors/maintenance-error';

interface MaintenanceState {
    enabled: boolean;
    startTime: Date | null;
}

export default fp(async (app: FastifyInstance, opts: any) => {
    const state: MaintenanceState = { enabled: false, startTime: null };

    app.decorate('maintenance', state);

    app.addHook('onRequest', async (req, reply) => {
        if (req.url.startsWith('/maintenance')) return;

        if (app.maintenance.enabled) {
            throw new MaintenanceError();
        }
    });
});

declare module 'fastify' {
    interface FastifyInstance {
        maintenance: MaintenanceState;
    }
}
