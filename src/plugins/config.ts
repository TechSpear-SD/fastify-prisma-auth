import fp from 'fastify-plugin';

import { config, type Config } from '../config';

export const configPlugin = fp(async (app) => {
    app.decorate('config', config);
});

declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
    }
}
