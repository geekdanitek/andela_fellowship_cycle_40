import database from './databaseConnection';
import bcrypt from 'bcryptjs';

const adminPassword = bcrypt.hashSync('ade123', 8);
const userPassword = bcrypt.hashSync('ade123', 8);

const createTables  = async () => {
	try {
		const query = `
			CREATE TABLE IF NOT EXISTS users(
	        id SERIAL PRIMARY KEY,
	        firstname VARCHAR(191) NOT NULL,
	        lastname VARCHAR(191) NOT NULL,
	        othername VARCHAR(191) NOT NULL,
	        email VARCHAR(191) NOT NULL,
	        password VARCHAR(191) NOT NULL,
	        phoneNumber VARCHAR(20) NOT NULL,
	        username VARCHAR(191) NOT NULL,
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
	        votes INT DEFAULT 0,
	        title VARCHAR(255) NOT NULL,
	        body TEXT NOT NULL,
	        FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
	        FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE);

	        CREATE TABLE IF NOT EXISTS rsvps(
	        id SERIAL,
	        meetupId INT NOT NULL,
	        userId INT NOT NULL,
	        response TEXT,
	        PRIMARY KEY(meetupId, userId),
	        FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE,
	        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE);

	        CREATE TABLE IF NOT EXISTS comments(
	        id SERIAL PRIMARY KEY,
	        questionId INT NOT NULL,
	        comment TEXT NOT NULL,
	        userId INT NOT NULL,
	        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
	        FOREIGN KEY (questionId) REFERENCES questions (id) ON DELETE CASCADE);
	        
	        CREATE TABLE IF NOT EXISTS votes(
	        id SERIAL PRIMARY KEY,
	        userId INT NOT NULL,
	        questionId INT NOT NULL,
	        vote VARCHAR(8) NOT NULL,
	        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
	        FOREIGN KEY (questionId) REFERENCES questions (id) ON DELETE CASCADE);

	        INSERT INTO users (firstname, lastname, othername, email, password, phoneNumber,username, isAdmin) 
	        VALUES ('Daniel', 'Adedeji', 'Ayokunle', 'adenew1234675558@gmail.com', '${adminPassword}', '08060917025', 'geek', TRUE);

	        INSERT INTO users (firstname, lastname, othername, email, password, phoneNumber,username, isAdmin) 
	        VALUES ('Daniel', 'Adedeji', 'Bayo', 'adenew12345@gmail.com', '${userPassword}', '08060917022', 'geekberry', FALSE);

	        INSERT INTO meetups (topic,location,happeningOn,tags) 
            VALUES ('This is a topic to test', 'Ikeja, Lagos Test', '2018-12-01 15:00:00', '{""}');

            INSERT INTO meetups (topic,location,happeningOn,tags) 
            VALUES ('This is a topic to test', 'Ikeja, Lagos Test', '2020-12-01 15:00:00', '{""}');

            INSERT INTO questions (createdBy, meetupId, title, body)
            VALUES (1, 1, 'When is facebook meetup', 'When is the next meetup available pls');

		`;

		const response = await database.query(query);
		//console.log(response);
		// await database.end();
	} catch (error) {
		//console.log(error);
	}
	
}

createTables();
