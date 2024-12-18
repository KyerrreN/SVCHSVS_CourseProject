"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        static associate(models) {
            Client.belongsTo(models.User, {
                foreignKey: "userId",
            });

            Client.hasMany(models.BidHistory, {
                foreignKey: "clientId",
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            });

            Client.hasOne(models.Bid, {
                foreignKey: "clientId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Client.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Client",
        }
    );
    return Client;
};
