require('dotenv').config();

module.exports = {
	server: {
		port: process.env.PORT ? process.env.PORT : 9001
	}
};