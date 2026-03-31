import 'dotenv/config';
import configPromise from '../src/payload.config';
import { getPayload } from 'payload';

async function run() {
  const config = await configPromise;
  const payload = await getPayload({ config });
  
  console.log('Dropping schema for fresh migration...');
  await payload.db.drizzle.execute('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  console.log('Schema dropped and recreated.');
  process.exit(0);
}

run();
