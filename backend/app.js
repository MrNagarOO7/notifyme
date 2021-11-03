const express = require('express');
const noCache = require('nocache');
const helmet = require('helmet');
const winston = require('winston');
const cors = require('cors');


// App Configuration Module
require('dotenv').config(); //Access .env File

global.logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
		winston.format.printf(info => {
			return `${info.timestamp} [${info.level}] : ${info.message}`;
		})
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		new (winston.transports.File)({
			name: 'file.info',
			filename: `./logs/info.log`,
			level: 'info',
			maxsize: 1024 * 5 // 5 kiloBytes
		}),
		new (winston.transports.File)({
			name: 'file.error',
			filename: `./logs/error.log`,
			level: 'error',
			maxsize: 1024 * 5 // 5 kiloBytes
		})
	]

});
const config = require('./config');
const routes = require('./routes');
const { dbConn } = require('./helpers');
const app = express();

// Middleware
app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

routes.initialize(app);

let listingPort = config.server.port;

const server = app.listen(listingPort,() => {
	logger.info(`Server Listening on ${listingPort}`);
	console.log(`Server Listening on ${listingPort}`);
});
