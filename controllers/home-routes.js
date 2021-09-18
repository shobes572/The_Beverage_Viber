const router = require('express').Router();
const { User, Beverage } = require('../models');
const withAuth = require('../utils/auth');

//Content shows only if the user is logged in

router.get('/', withAuth, async (req, res) => {
  req.session.loggedIn = false;
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      session_data: req.session,
    });

  } catch (err) {
    res.status(418).json(err);
  }
});



router.get('/login-signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('bevselect');
  } else {
    res.render('login-signup', {
      session_data: req.session,
    });
  }
});

//when user logs in or signs up, route to direct user to the beverage selection page: how I think the code should work router.get with the named /bevselect

router.get('/bevselect', async (req, res) => {
  res.render('suggestion', {
    session_data: req.session,
  });
});

module.exports = router;