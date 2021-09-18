const router = require('express').Router()
const { Beverage, Review } = require('../../models')

router.get('/:id', (req, res) => {
    Beverage.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbBeverageData => {
            if (!dbBeverageData) {
                res.status(418).json({ message: 'No beverage exists with this ID.' })
                return;
            }
            res.json(dbBeverageData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/category/:bevType', (req, res) => {
    console.log('SUCCESS')
    if (req.params.bevType === 'none') {
        Beverage.findAll({
        }).then(dbBeverageData => {
            if (!dbBeverageData) {
                res.status(418).json({ message: 'No beverage exists with this ID.' })
                return;
            }
            let idList = dbBeverageData.map(beverage => beverage.id)
            let randomId = idList[Math.floor(Math.random() * idList.length)]
            let randomBeverage = dbBeverageData.filter(beverage => beverage.id === randomId)
            res.render('beverage', {
                session_data: req.session,
                beverage_data: randomBeverage[0].toJSON()
              });
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        Beverage.findAll({
            where: {
                category: req.params.bevType
            }
        }).then(dbBeverageData => {
            if (!dbBeverageData) {
                res.status(418).json({ message: 'No beverage exists with this ID.' })
                return;
            }
            let idList = dbBeverageData.map(beverage => beverage.id)
            let randomId = idList[Math.floor(Math.random() * idList.length)]
            let randomBeverage = dbBeverageData.filter(beverage => beverage.id === randomId)
            res.render('beverage', {
                session_data: req.session,
                beverage_data: randomBeverage[0].toJSON()
              });
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;