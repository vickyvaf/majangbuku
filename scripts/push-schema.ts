import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function run() {
  console.log('Initializing payload to push DB schema...');
  const config = await configPromise;
  await getPayload({ config });
  console.log('Database schema pushed successfully.');
  process.exit(0);
}

run();
