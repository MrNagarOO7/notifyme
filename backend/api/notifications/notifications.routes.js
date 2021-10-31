const router = require('express').Router();
const controller = require('./notifications.controller');

router.post(
	'/',
	controller.addNotification
);