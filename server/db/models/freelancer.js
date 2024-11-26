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
                allowNull: false,
            },
            header: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            rating: {
                type: DataTypes.REAL,
                allowNull: false,
            },
            piclink: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hardskills: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            softskills: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Freelancer",
        }
    );
    return Freelancer;
};
