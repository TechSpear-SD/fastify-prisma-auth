import type { FastifyInstance } from 'fastify';

export default async function authRoutes(fastify: FastifyInstance) {
    /**
     * Proxy all auth requests to better-auth handler
     *
     */
    fastify.all('/*', async (request, reply) => {
        try {
            const url = new URL(request.url, `http://${request.headers.host}`);

            const headers = new Headers();
            for (const [key, value] of Object.entries(request.headers)) {
                if (value) headers.append(key, String(value));
            }

            const req = new Request(url.toString(), {
                method: request.method,
                headers,
                body: request.body ? JSON.stringify(request.body) : undefined,
            });

            const res = await fastify.auth.handler(req);

            reply.status(res.status);
            res.headers.forEach((value, key) => reply.header(key, value));
            reply.send(res.body ? await res.text() : null);
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
