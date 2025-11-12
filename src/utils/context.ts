import { AsyncLocalStorage } from 'node:async_hooks';

export interface Context {
    correlationId: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<Context>();
