// Store socket.io instance in module-static variable
var instance;

module.exports.getInstance = getInstance = () => {
    return instance;
};

module.exports.init = init = (server) => {
    var io;
    const { notificationService } = require('../api/notifications');

    let count = 1;

    io = require('socket.io')(server, {
        cors: {
            origin: "*",
        }
    });

    instance = io;

    if (io.on) {
        io.on('connection', (client) => {
            console.log('---id------', client.id);

            client.on('addNotification', async () => {
                try {
                    await notificationService.addNotification({
                        title: `Notification ${count}`,
                        body: `Hello, This is Notification ${count}. Check it`
                    });
                    count++;
                    let notificationResp = await notificationService.listNotification();
                    if(notificationResp.success){
                        client.emit('listNotification', notificationResp.data);
                    }
                } catch (e) {
                    console.log(e);
                }
            });

            client.on('fetchInitialNotification', async () => {
                try {
                    let notificationResp = await notificationService.listNotification();
                    if(notificationResp.success){
                        client.emit('listNotification', notificationResp.data);
                    }
                } catch (e) {
                    console.log(e);
                }
            });

            client.on('deleteAllNotification', async () => {
                try {
                    let notificationResp = await notificationService.removeAllNotification();
                    if(notificationResp.success){
                        client.emit('listNotification', notificationResp.data);
                    }
                } catch (e) {
                   console.log(e);
                }

            })
        });
    }
};
