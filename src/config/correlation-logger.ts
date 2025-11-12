import { asyncLocalStorage } from '../utils/context';

export const loggerOptions = {
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        },
    },
    mixin() {
        const store = asyncLocalStorage.getStore();
        return store ? { correlationId: store.correlationId } : {};
    },
};
