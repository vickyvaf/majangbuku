import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function run() {
  console.log('Initializing payload to truncate books...');
  const config = await configPromise;
  const payload = await getPayload({ config });
  
  // Truncate books table (using Local API to delete all)
  await payload.db.drizzle.execute('TRUNCATE TABLE "books" CASCADE;');
  
  console.log('Books table truncated.');
  process.exit(0);
}

run();
