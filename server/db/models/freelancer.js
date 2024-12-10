"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Freelancer extends Model {
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
            username: {
                type: DataTypes.STRING(32),
                allowNull: false,
                validate: {
                    len: [8, 32],
                },
            },
            password: {
                type: DataTypes.STRING(100),
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
            spec: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: true,
                    len: [1, 100],
                    isIn: [
                        [
                            "Web Developer",
                            "Backend Software Engineer",
                            "UI Designer",
                        ],
                    ],
                },
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
                allowNull: false,
            },
            hardskills: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                validate: {
                    notNull: true,
                    isArrayAndLength(value) {
                        if (!Array.isArray(value)) {
                            throw new Error(
                                "Hardskills must be specified as an array"
                            );
                        }

                        if (value.length < 1) {
                            throw new Error(
                                "You cannot specify less than 1 hard skill"
                            );
                        }

                        if (value.length > 5) {
                            throw new Error(
                                "You cannot specify more than 5 hard skills"
                            );
                        }
                    },
                },
            },
            softskills: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                validate: {
                    notNull: true,

                    isArrayAndLength(value) {
                        if (!Array.isArray(value)) {
                            throw new Error(
                                "Softskills must be specified as an array"
                            );
                        }

                        if (value.length < 1) {
                            throw new Error(
                                "You cannot specify less than 1 soft skill"
                            );
                        }

                        if (value.length > 5) {
                            throw new Error(
                                "You cannot specify more than 5 soft skills"
                            );
                        }
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Freelancer",
        }
    );
    return Freelancer;
};
