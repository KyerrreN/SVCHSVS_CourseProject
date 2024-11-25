"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bid extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Bid.belongsToMany(models.Freelancer, {
                through: models.FreelancerBid,
                foreignKey: "bidId",
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
            },
            desc: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            spec: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            payment: {
                type: DataTypes.FLOAT,
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
