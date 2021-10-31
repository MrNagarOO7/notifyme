const Sequelize = require('sequelize');

// sequelize connect
exports.getSqlConnection = (config) => {
    let seqInstance = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        port: config.port,
        dialect: 'postgres',
        timezone: '+00:00', //Default `+00:00` to manage data as per timezone
    });

    seqInstance
        .authenticate()
        .then(() => {
            logger.info('Connection has been established successfully.');
        })
        .catch((error) => {
            logger.error('Unable to connect to the database:', error);
            throw error;
        });

    seqInstance = {
        Sequelize: Sequelize,
        seqInstance: seqInstance,
        Notification: seqInstance.import('../api/notifications/notifications.model')
    };
    return seqInstance;
};
