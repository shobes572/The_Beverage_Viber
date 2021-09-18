const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 30
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 200
            }
        },
        //foreign key from User
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // },
        // //foreign key from Beverage
        // beverage_id: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'beverage',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
);

module.exports = Review;