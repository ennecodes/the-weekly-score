import { SecretManagerServiceClient} from '@google-cloud/secret-manager';
import { PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";
import { singleton } from './singleton.server';

  // Instantiates a client
  const secretmanagerClient = new SecretManagerServiceClient();
  
  const name = 'projects/902234154686/secrets/DATABASE_URL/versions/1';
  async function getDBSecret() {
    try {
      // Access the secret version
      const [version] = await secretmanagerClient.accessSecretVersion({ name });
  
      if (version?.payload?.data) {
        console.log('🔑 Retrieved database URL from Secret Manager');
        return version.payload.data.toString();
      }
  
      throw new Error('Secret payload is empty');
    } catch (error) {
      console.error('❌ Failed to retrieve database URL from Secret Manager:', error);
      throw new Error('Failed to retrieve database URL');
    }
  }


// Hard-code a unique key, so we can look up the client when this module gets re-imported
const prisma = await singleton("prisma", getPrismaClient);

async function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = await getDBSecret();
  }

  
  const {DATABASE_URL}  = process.env
  invariant(typeof DATABASE_URL === "string", "DATABASE_URL env var not set");

  const databaseUrl = new URL(DATABASE_URL);


  console.log(`🔌 setting up prisma client to ${databaseUrl.host}`);
  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is. So if you need to change
  // something in this file, you'll need to manually restart the server.
  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
  // connect eagerly
  client.$connect();

  return client;
}

export { prisma };
