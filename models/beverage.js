const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Beverage extends Model { }
//Generates Beverage Cards pulled from Seeds DB and can be selected as a User Favorite
Beverage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        beverage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'beverage'
    }
);

module.exports = Beverage;