"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BidHistory extends Model {
        static associate(models) {
            BidHistory.belongsTo(models.Client, {
                foreignKey: "clientId",
            });
            BidHistory.belongsTo(models.Freelancer, {
                foreignKey: "freelancerId",
            });
        }
    }
    BidHistory.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            freelancerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rated: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    isNumeric: true,
                    isInt: true,
                    max: 5,
                    min: 0,
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deadline: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            assigned: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            done: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "BidHistory",
        }
    );
    return BidHistory;
};
