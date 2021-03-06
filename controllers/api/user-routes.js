const router = require('express').Router()
const { User, Beverage, Review } = require('../../models')
//grab attributes the user choses, such as favorite beverages
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Review,
            attributes: [
                'title',
                'content',
                'created_at'
            ]
        },
        {
            model: Beverage,
            attributes: [
                'title',
                'description',
                'image'
            ],
            as: 'beverage_favorites'
        }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(418).json({ message: 'No user found with this ID.' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//Sign Up Route
router.post('/', (req, res) => {
    User.create(
        req.body
    )
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;

                res.json({ session_data: req.session });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//Login Route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(418).json({ message: 'No user found with this username.' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(418).json({ message: 'Incorrect password.' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ session_data: req.session });
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//Log Out Route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
        res.json({ session_data: req.session });
    }
});

module.exports = router;