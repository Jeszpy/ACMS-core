import { Client } from 'pg';

const pgClient = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

const dbClient = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

export const initDb = async () => {
  try {
    await pgClient.connect();
    const queryForDBs = await pgClient.query('SELECT datname FROM pg_database');
    const dbList = queryForDBs.rows;
    for (const item of dbList) {
      if (item['datname'] === 'ACMS') return;
    }
    await pgClient.query(
      'CREATE DATABASE "ACMS" WITH OWNER = postgres ENCODING = "UTF8" CONNECTION LIMIT = -1',
    );
    await dbClient.connect();
    await dbClient.query(text);
  } catch (e) {
    console.log('dbExist', e);
  } finally {
    await pgClient.end();
    await dbClient.end();
  }
};

// CREATE TABLE public."Employee"
// (
//   id serial NOT NULL,
//   personnel_number integer,
//   department integer,
//   job_title integer,
//   last_name text NOT NULL,
//   first_name text NOT NULL,
//   patronymic text,
//   advanced text,
//   "isActive" boolean DEFAULT true,
//   PRIMARY KEY (id)
// );
//
// ALTER TABLE IF EXISTS public."Employee"
// OWNER to postgres;
