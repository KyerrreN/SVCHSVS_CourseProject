"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bid extends Model {
        static associate(models) {
            Bid.belongsToMany(models.Freelancer, {
                through: models.FreelancerBid,
                foreignKey: "bidId",
            });

            Bid.belongsTo(models.Client, {
                foreignKey: "clientId",
            });

            Bid.belongsTo(models.Spec, {
                foreignKey: "specId",
            });

            Bid.hasOne(models.BidOffer, {
                foreignKey: "bidId",
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        }
    }
    Bid.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: true,
                    len: [1, 100],
                },
            },
            desc: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                validate: {
                    notNull: true,
                    len: [1, 1000],
                },
            },
            specId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            payment: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notNull: false,
                    min: 1,
                    max: 100000,
                    isFloat: true,
                },
            },
            isTaken: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Bid",
        }
    );
    return Bid;
};
