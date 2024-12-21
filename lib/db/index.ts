import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { Client } from '@planetscale/database';
import { dbConfig } from './config';
import * as schema from './schema';

// Create a new client instance
const client = new Client({
  url: dbConfig.url
});

// Create the database instance
export const db = drizzle(client, { schema });