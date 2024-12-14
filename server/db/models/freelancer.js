"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Freelancer extends Model {
        static associate(models) {
            Freelancer.belongsToMany(models.Bid, {
                through: models.FreelancerBid,
                foreignKey: "freelancerId",
            });
            Freelancer.belongsTo(models.User, {
                foreignKey: "userId",
            });
            Freelancer.belongsTo(models.Spec, {
                foreignKey: "specId",
            });
            Freelancer.hasMany(models.Rating, {
                foreignKey: "freelancerId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Freelancer.hasMany(models.BidHistory, {
                foreignKey: "freelancerId",
                onDelete: "NO ACTION",
                onUpdate: "CASCADE",
            });
        }
    }
    Freelancer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(24),
                allowNull: false,
                validate: {
                    isAlpha: true,
                    notNull: true,
                    len: [1, 24],
                },
            },
            surname: {
                type: DataTypes.STRING(24),
                allowNull: false,
                validate: {
                    isAlpha: true,
                    notNull: true,
                    len: [1, 24],
                },
            },
            specId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            header: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: true,
                    len: [1, 100],
                },
            },
            rating: {
                type: DataTypes.REAL,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    isFloat: true,
                    notNull: true,
                    max: 5,
                    min: 0,
                },
            },
            piclink: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
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
