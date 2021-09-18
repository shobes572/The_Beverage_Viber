const User = require('./user');
const Review = require('./review');
const Beverage = require('./beverage');
const Favorite = require('./favorite');

// //Reviews has many users
// User.hasMany(Review, {
//     foreignKey: 'user_id'
// });
// //Only users can make reviews
// Review.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: "cascade"
// });
// Beverage.belongsToMany(User, {
//     through: {
//         model: Favorite,
//         unique: false
//     },
//     as: 'user_beverages',
//     onDelete: "cascade"
// });
// User.belongsToMany(Beverage, {
//     through: {
//         model: Favorite,
//         unique: false
//     },
//     as: 'beverage_favorites',
//     onDelete: "cascade"
// });
// Beverage.hasMany(Review, {
//     foreignKey: 'beverage_id'
// });
// //Reviews can only be made to Beverages
// Review.belongsTo(Beverage, {
//     foreignKey: 'beverage_id',
//     onDelete: "cascade"
// });

module.exports = { User, Review, Beverage, Favorite };