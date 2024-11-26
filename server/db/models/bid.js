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
        },
        {
            sequelize,
            modelName: "Bid",
        }
    );
    return Bid;
};
