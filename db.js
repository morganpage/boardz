//const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

import pg from 'pg';

const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL ?
  { connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  } :
  {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'boardz'
  }

const pool = new Pool(poolConfig);

export default pool;