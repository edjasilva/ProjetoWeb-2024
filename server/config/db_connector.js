import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db= new pg.Client({

    connectionString: process.env.DB_CONNECT

})

export default db;