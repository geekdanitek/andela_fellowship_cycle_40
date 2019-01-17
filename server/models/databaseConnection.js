import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


let databaseUrl = null;


if(!process.env.NODE_ENV === 'test'){
	
	databaseUrl = process.env.DATABASE_URL || 'postgres://lvtzsand:29cCkUeSUTGjthCI3Vn23keX8vtPGhhi@baasu.db.elephantsql.com:5432/lvtzsand';
} else {
	
	databaseUrl = process.env.DATABASE_URL_TEST || 'postgres://stirpuni:LsYVV2PMNK2r6SxUFLOa4x3bxD_mQbbT@baasu.db.elephantsql.com:5432/stirpuni';
}

const database = new Pool({ connectionString: databaseUrl});

export default database;