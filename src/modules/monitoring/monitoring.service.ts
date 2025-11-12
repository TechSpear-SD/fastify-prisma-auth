import type { FastifyInstance } from 'fastify';
import packageJson from '../../../package.json';

export interface MonitoringStatus {
    status: 'OK' | 'ERROR';
    details: Record<string, any>;
}

export const createMonitoringService = (app: FastifyInstance) => ({
    async health(): Promise<MonitoringStatus> {
        const details: Record<string, any> = {};

        try {
            await app.prisma.$queryRaw`SELECT 1`;
            details.database = 'OK';
        } catch (err) {
            details.database = 'ERROR';
        }

        const allOk = Object.values(details).every((v) => v === 'OK');

        return {
            status: allOk ? 'OK' : 'ERROR',
            details,
        };
    },

    async version() {
        return {
            version: packageJson.version || '0.0.0',
            uptime: await this.getUptime(),
        };
    },

    async getUptime() {
        return Math.floor(process.uptime()) + 's';
    },
});
