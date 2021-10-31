const initialize = (app) => {
	app.get('/api/ping', (req, res) => {
		res.status(200).send({
			success: true,
			statusCode: 200
		});
	});
};

module.exports = { initialize };
