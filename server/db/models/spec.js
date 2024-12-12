"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spec extends Model {
        static associate(models) {
            Spec.hasMany(models.Freelancer, {
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Spec.hasMany(models.Bid, {
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
