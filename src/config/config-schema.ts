import z from 'zod';

export const ConfigSchema = z.object({
    NODE_ENV: z.enum(['dev', 'prod', 'rec']).default('dev'),

    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.url(),

    BETTER_AUTH_SECRET: z.string().min(10),
    JWT_SECRET: z.string().min(10),

    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});
