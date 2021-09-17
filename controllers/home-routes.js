const router = require('express').Router();
const { User, Beverage } = require('../models');
const withAuth = require('../utils/auth');

//Content shows only if the user is logged in

router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        loggedIn: req.session.loggedIn,
      });

    } catch (err) {
      res.status(500).json(err);
    }
  });



router.get('/login-signup', async (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
    } else {
        res.render('login-signup');
    }
});

module.exports = router;




