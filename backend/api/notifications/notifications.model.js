const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {

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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            timestamps: true
        }
    );

    /**
     * Create Notification
     */

    Notification.createNotification = async (data = {}) => {
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

    Notification.listNotifications =  async () =>  {
        return await Notification.findAll()
            .then((data) => {
                return data;})
            .catch((err) => {
                throw err;
            });
    };

    return Notification;
};
