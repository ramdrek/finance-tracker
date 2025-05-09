// src/lib/trpc/trpcClient.ts
import { browser } from '$app/environment';
import { createTrpcClient } from './client';
import { readable } from 'svelte/store';

export const trpc = readable(browser ? createTrpcClient(fetch) : null);
