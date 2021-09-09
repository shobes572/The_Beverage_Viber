const User = require('./urser');
const Review = require('./review');
const Beverage = require('./beverage');

User.hasMany(Review, {
    foreignKey: 'user_id'
});
Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Beverage.hasMany(Review, {
    foreignKey: 'beverage_id'
});
Review.belongsTo(Beverage, {
    foreignKey: 'beverage_id',
    onDelete: "cascade"
});

module.exports = { User, Review, Beverage };