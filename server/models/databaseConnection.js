import { Pool } from 'pg';
// import dotenv from 'dotenv';

require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
console.log(databaseUrl);

const database = new Pool({ connectionString: 'postgres://postgres:user@localhost:5432/questioner'});

export default database;