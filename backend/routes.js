const { notificationRoutes } = require('./api/notifications');

const initialize = (app) => {
	app.use('/api/notification', notificationRoutes);

	app.get('/api/ping', (req, res) => {
		res.status(200).send({
			success: true,
			statusCode: 200
		});
	});
};

module.exports = { initialize };
