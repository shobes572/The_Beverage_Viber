const router = require('express').Router()
const { User, Beverage, Review } = require('../../models')

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
                'images'
            ]
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

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
});

module.exports = router;