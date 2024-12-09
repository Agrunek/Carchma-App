import { MongoClient, ServerApiVersion } from 'mongodb';
import { ATLAS_URI } from '../constants/env.js';

const client = new MongoClient(ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db('admin').command({ ping: 1 });
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
} catch (error) {
  console.error(error);
  process.exit(1);
}

const db = client.db('dev');

export default db;
