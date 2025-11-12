import { buildApp } from './server';

const start = async () => {
    const app = await buildApp();

    app.listen({ port: 3000 }, (err, _) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
    });
};

start();
