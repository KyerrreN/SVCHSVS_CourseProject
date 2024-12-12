"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        static associate(models) {
            Rating.belongsTo(models.Freelancer, {
                foreignKey: "freelancerId",
            });
        }
    }
    Rating.init(
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
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Rating",
        }
    );
    return Rating;
};
