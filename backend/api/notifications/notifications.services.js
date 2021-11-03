const  Notification = require('./notifications.model');

exports.addNotification = async (data) => {
    const notificationInfo = await Notification.createNotification(data);

    if (notificationInfo) {
        return { success: true, data: notificationInfo, message: 'ADD_NOTIFICATION' };
    }
};

exports.listNotification = async () => {
    const notificationInfo = await Notification.listNotifications();

    if (notificationInfo) {
        return { success: true, data: notificationInfo, message: 'LIST_NOTIFICATION' };
    }
};

exports.removeAllNotification = async () => {
	const notificationInfo = await Notification.deleteNotifications();
	return { success: true, data: [], message: 'DELETE_NOTIFICATION' };
};