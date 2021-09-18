const sequelize = require('../config/connection');
const { User, Review, Beverage, Favorite } = require('../models');
const seedDataBeverages = require('./beverage_db.json');
const seedDataUsers = require('./user_db.json');

const seedDatabase = async () => {
    // await sequelize.sync({ force: true });
    // const beverages = await Beverage.bulkCreate(seedDataBeverages);
    // process.exit(0);
    
}

seedDatabase();