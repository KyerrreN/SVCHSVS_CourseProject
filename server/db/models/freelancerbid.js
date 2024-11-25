"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FreelancerBid extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
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
        },
        {
            sequelize,
            modelName: "FreelancerBid",
        }
    );
    return FreelancerBid;
};
