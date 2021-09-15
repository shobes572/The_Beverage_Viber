const router = require('express').Router();
const { User, Review, Favorite, Beverage } = require('../models');
const { post } = require('./api');

router.get('/login-signup', async (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
    } else {
        res.render('homepage');
    }
});




