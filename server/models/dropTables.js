import database from './databaseConnection';

const dropTables = async () => {
	try {
		const query = `	
						DROP TABLE IF EXISTS users CASCADE;
						DROP TABLE IF EXISTS meetups CASCADE;
						DROP TABLE IF EXISTS questions CASCADE;
						DROP TABLE IF EXISTS comments CASCADE;
						DROP TABLE IF EXISTS rsvps CASCADE;
						DROP TABLE IF EXISTS votes CASCADE;
						`;
		const response = await database.query(query);
		await database.end();
		console.log(response);

	} catch (errors) {
		console.log(errors);
	}
}

dropTables();