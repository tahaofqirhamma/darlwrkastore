import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './db', // folder where Drizzle models live
  out: './drizzle/migrations', // where migrations will be generated
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '', // your Neon URL
  },
} satisfies Config;
