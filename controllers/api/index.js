const router = require('express').Router();
const userRoutes = require('./user-routes');
const beverageRoutes = require('./beverage-routes');

router.use('/users', userRoutes);
router.use('/beverage', beverageRoutes);

module.exports = router;