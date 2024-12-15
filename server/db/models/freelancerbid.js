"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FreelancerBid extends Model {
        static associate(models) {
            FreelancerBid.belongsTo(models.Freelancer, {
                foreignKey: "freelancerId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            FreelancerBid.belongsTo(models.Bid, {
                foreignKey: "bidId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    FreelancerBid.init(
        {
            freelancerId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Freelancers",
                    key: "id",
                },
            },
            bidId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Bids",
                    key: "id",
                },
            },
            deadline: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            assigned: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: {
                        args: [
                            [
                                "Done",
                                "Pending Review",
                                "Almost Done",
                                "In Progress",
                                "On Hold",
                            ],
                        ],
                        msg: "Status can be: Done, Pending Review, Almost Done, In Progress, On Hold",
                    },
                },
            },
            clientMessage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            freelancerMessage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "FreelancerBid",
        }
    );
    return FreelancerBid;
};
