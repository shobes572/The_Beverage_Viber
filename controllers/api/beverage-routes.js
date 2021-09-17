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

router.get('/:bevType', (req, res) => {
    if (bevType === 'none') {
        Beverage.findAll({
        }).then(dbBeverageData => {
            if (!dbBeverageData) {
                res.status(418).json({ message: 'No beverage exists with this ID.' })
                return;
            }
            let idList = dbBeverageData.map(beverage => beverage.id)
            let randomId = idList[math.floor(math.random() * idList.length)]
            let randomBeverage = dbBeverageData.filter(beverage => beverage.id === randomId)
            res.json(randomBeverage);
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
            let randomId = idList[math.floor(math.random() * idList.length)]
            let randomBeverage = dbBeverageData.filter(beverage => beverage.id === randomId)
            res.json(randomBeverage);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;