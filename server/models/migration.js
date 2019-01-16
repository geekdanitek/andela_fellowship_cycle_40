import database from './databaseConnection';

const createTables  = async () => {
	console.log('I am creating tables');
	try {
		const query = `
			CREATE TABLE IF NOT EXISTS users(
	        id SERIAL PRIMARY KEY,
	        firstname VARCHAR(191) NOT NULL,
	        lastname VARCHAR(191) NOT NULL,
	        othername VARCHAR(191) NOT NULL,
	        email VARCHAR(191) UNIQUE NOT NULL,
	        password VARCHAR(191) NOT NULL,
	        phoneNumber VARCHAR(20) NOT NULL,
	        username VARCHAR(191) UNIQUE NOT NULL,
	        isAdmin BOOLEAN DEFAULT FALSE,
	        registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

	        CREATE TABLE IF NOT EXISTS meetups(
	        id SERIAL PRIMARY KEY,
	        topic VARCHAR(255) NOT NULL,
	        location TEXT NOT NULL,
	        happeningOn TIMESTAMP NOT NULL,
	        image VARCHAR(50),
	        tags TEXT[],
	        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

	        CREATE TABLE IF NOT EXISTS questions(
	        id SERIAL PRIMARY KEY,
	        createdOn TIMESTAMPTZ DEFAULT NOW(),
	        createdBy INT NOT NULL,
	        meetupId INT NOT NULL,
	        title VARCHAR(255) NOT NULL,
	        body TEXT NOT NULL,
	        FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
	        FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE);

	        CREATE TYPE response_set AS ENUM('yes', 'no', 'maybe');

	        CREATE TABLE IF NOT EXISTS rsvps(
	        id SERIAL,
	        meetupId INT NOT NULL,
	        userId INT NOT NULL,
	        response response_set,
	        PRIMARY KEY(meetupId, userId),
	        FOREIGN KEY (userId) REFERENCES meetups (id) ON DELETE CASCADE,
	        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE);

	        CREATE TABLE IF NOT EXISTS comments(
	        id SERIAL PRIMARY KEY,
	        meetupId INT NOT NULL,
	        questionId INT NOT NULL,
	        comment TEXT NOT NULL,
	        userId INT NOT NULL,
	        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
	        FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE,
	        FOREIGN KEY (questionId) REFERENCES questions (id) ON DELETE CASCADE);
	        
	        CREATE TABLE IF NOT EXISTS votes(
	        id SERIAL PRIMARY KEY,
	        userId INT NOT NULL,
	        questionId INT NOT NULL,
	        vote VARCHAR(8) NOT NULL,
	        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
	        FOREIGN KEY (questionId) REFERENCES questions (id) ON DELETE CASCADE);
		`;

		const response = await database.query(query);
		await database.end();
		console.log(response);
	} catch (error) {
		console.log(error);
	}
	
}

createTables();
