import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma';

export default async function authPlugin(fastify: FastifyInstance) {
    const auth = betterAuth({
        database: prismaAdapter(prisma, {
            provider: 'postgresql',
        }),
        appName: fastify.config.APP_NAME,
        appUrl: fastify.config.APP_URL,
        basePath: '/api/auth',
        baseURL: fastify.config.APP_URL,
        secret: fastify.config.BETTER_AUTH_SECRET,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: true,
            autoSignInAfterSignUp: true,
            sendResetPassword: async ({ user, url, token }) => {
                fastify.log.info(
                    `Send reset password email to ${user.email}: ${url} (token: ${token})`
                );
            },
        },
        session: {
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60 * 1000, // 5 minutes
            },
        },
        emailVerification: {
            sendVerificationEmail: async ({ user, url, token }) => {
                fastify.log.info(
                    `Send verification email to ${user.email}: ${url} (token: ${token})`
                );
            },
            sendOnSignUp: true,
            sendOnSignIn: true,
            autoSignInAfterVerification: true,
        },
    });

    fastify.decorate('auth', auth);
}

declare module 'fastify' {
    interface FastifyInstance {
        auth: ReturnType<typeof betterAuth>;
    }
}
