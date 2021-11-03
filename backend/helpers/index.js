const dbConn = require('./database');
const commonResponse = require('./response');
const socket = require('./socketIO');

module.exports = {
	dbConn,
	commonResponse,
	socket
};