const router = require('express').Router();
const { User, Beverage } = require('../models');

//Content shows only if the user is logged in

router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });

    } catch (err) {
      res.status(500).json(err);
    }
  });



router.get('/login-signup', async (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
    } else {
        res.render('homepage');
    }
});

module.exports = router;




