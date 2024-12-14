"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BidOffer extends Model {
        static associate(models) {
            BidOffer.belongsTo(models.Freelancer, {
                foreignKey: "freelancerId",
            });

            BidOffer.belongsTo(models.Bid, {
                foreignKey: "bidId",
            });

            BidOffer.belongsTo(models.Client, {
                foreignKey: "clientId",
            });
        }
    }
    BidOffer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            freelancerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bidId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            freelancerMessage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "BidOffer",
        }
    );
    return BidOffer;
};
