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
    res.status(418).json(err);
  }
});



router.get('/login-signup', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('suggestion');
  } else {
    res.render('login-signup');
  }
});

//when user logs in or signs up, route to direct user to the beverage selection page: how I think the code should work router.get with the named /bevselect

router.get('/bevselect', async (req, res) => {
  res.render('suggestion')
});

//when user selects coffee, a beverage of coffee is shown on new page: how I think the code should work router.get with the named /coffee,  get one? attributes category:coffee

router.get('/category/coffee', async (req, res) => {
    res.render('beverage');

});

//when user selects tea, a beverage of tea is shown on new page: how I think the code should work router.get with the named /tea, get one? attributes category: tea

router.get('/category/tea', async (req, res) => {
  try {
    const userSelectTea = await Beverage.findOne({});

    res.render('beverage', {
      userSelectTea
    });
  } catch (err) {
    res.status(418).json(err);
  }
});

//when user selects suprise me, a beverage of either coffee or tea will be displayed: how I think the code should work router.get /supriseme!, get one? no need for selected attributes

router.get('/category/none', async (req, res) => {
  try{
    const userSelectSurprise = await Beverage.findOne({});

    res.render('beverage', {
      userSelectSurprise
    });
  } catch (err) {
    res.status(418).json(err);
  }

})

module.exports = router;




