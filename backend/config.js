require('dotenv').config();

module.exports = {
	server: {
		port: process.env.PORT ? process.env.PORT : 9001
	},
	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		database: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	},
};