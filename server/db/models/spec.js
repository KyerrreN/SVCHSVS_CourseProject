"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spec extends Model {
        static associate(models) {
            Spec.hasMany(models.Freelancer, {
                foreignKey: "specId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Spec.hasMany(models.Bid, {
                foreignKey: "specId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Spec.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Spec",
        }
    );
    return Spec;
};
