const service = require('./notifications.services');
const { commonResponse } = require("../../helpers");

exports.addNotification = async (req, res) => {
	try {
		const data = await service.addNotification(req.body);

		if (data.success) {
			return commonResponse.success(res, data.data, data.message);
		}
		return commonResponse.keyAlreadyExist(res, {}, data.message);
	} catch (error) {
		logger.error("Error addNotification ==>", error);
		return commonResponse.sendUnexpected(res, error);
	}
};
