const { DataTypes } = require('sequelize');
const { dbConn } = require('../../helpers');

const sequelize = dbConn.getSqlConnection();

const Notification = sequelize.define(
    'notifications',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isread: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: true,
        sequelize,
        tableName: 'notifications',
    }
);

    /**
     * Create Notification
     */

const createNotification = async (data) => {
    return await Notification.create(data)
    .then((output) => {
        return output;
    })
    .catch((err) => {
        throw err;
    });
};

    /**
     * get All Notification Data
     */

const listNotifications =  async () =>  {
    return await Notification.findAll()
    .then((data) => {
        return data;})
    .catch((err) => {
        throw err;
    });
};

module.exports = {
    createNotification,
    listNotifications
};
