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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caffiene: {
            type: DataTypes.STRING,
            allowNull: true
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