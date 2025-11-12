import packageJson from '../../../package.json';

export default async function monitoringRoutes(fastify: any) {
    fastify.get('/', async () => {
        return {
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            status: 'OK',
        };
    });

    fastify.get('/version', async () => {
        return {
            version: packageJson.version || '0.0.0',
        };
    });
}
