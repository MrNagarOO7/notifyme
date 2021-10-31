exports.addNotification = async (data) => {
    const notificationInfo = await sqConn.Notification.createNotification(data);

    if (notificationInfo) {
        return { success: true, data: notificationInfo, message: 'ADD_NOTIFICATION' };
    }
};