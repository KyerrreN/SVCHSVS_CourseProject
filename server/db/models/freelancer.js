"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Freelancer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Freelancer.belongsToMany(models.Bid, {
                through: models.FreelancerBid,
                foreignKey: "freelancerId",
            });
        }
    }
    Freelancer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(24),
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING(24),
                allowNull: false,
            },
            spec: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            header: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            rating: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            piclink: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            hardskills: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            softskills: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Freelancer",
        }
    );
    return Freelancer;
};
