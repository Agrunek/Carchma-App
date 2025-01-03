import { GridFSBucket } from 'mongodb';
import db from './connection.js';

const bucket = new GridFSBucket(db);

export default bucket;
