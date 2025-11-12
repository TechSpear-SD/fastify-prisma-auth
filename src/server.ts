import Fastify, { fastify } from 'fastify';

import { registerGlobalPlugins } from './plugins';
import { registerModules } from './modules';
import { errorHandler } from './middlewares/error-handler';
import { loggerOptions } from './config/correlation-logger';

export async function buildApp() {
    const app = Fastify({ logger: loggerOptions });

    app.setErrorHandler(errorHandler);

    await registerGlobalPlugins(app);

    await registerModules(app);

    await app.ready();

    app.log.info(app.printRoutes());

    return app;
}
