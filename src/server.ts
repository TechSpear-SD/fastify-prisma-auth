import Fastify from 'fastify';
import { registerPlugins } from './plugins';
import { registerModules } from './modules';
import { errorHandler } from './middlewares/error-handler';

export async function buildApp() {
    const app = Fastify({ logger: true });

    await registerPlugins(app);
    await registerModules(app);

    app.setErrorHandler(errorHandler);

    return app;
}
