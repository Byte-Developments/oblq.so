import { Client } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { dbConfig } from './config';
import * as schema from './schema';

// Create a singleton client instance
let client: Client | null = null;

export function getClient() {
  if (!client) {
    client = new Client({
      url: dbConfig.url,
      fetch: (url: string, init: any) => {
        return fetch(url, {
          ...init,
          cache: 'no-store',
        });
      },
    });
  }
  return client;
}

// Create the database instance
export function getDb() {
  const client = getClient();
  return drizzle(client, { schema });
}

// Export a singleton instance
export const db = getDb();