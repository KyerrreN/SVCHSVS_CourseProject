"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Freelancer, {
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
            User.hasOne(models.Client, {
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
