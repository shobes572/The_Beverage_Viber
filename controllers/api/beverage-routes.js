const router = require('express').Router()
const { Beverage, Review } = require('../../models')

router.get('/:id', (req, res) => {
    let reqID;
    if (req.params.id.toLowerCase() === 'fred') {
        reqID = math.floor(math.random() * 56)
    }
    else {
        reqID = req.params.id
    }
    Beverage.findOne({
        where: {
            id: reqID
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

module.exports = router;