const Meter_entries = require('../models/Meter_entries');

const meter_entriesController = {
    getMeter_entries(req, res, next) {
        Meter_entries.findAll({
            date,
            reading,
            notes
        } = req.body)
        .then(() => {
            res.status(201).send()
        })
        .catch((err) => {
            console.log(err)
        })
    },
    addMeter_entries(req, res, next) {
        Meter_entries.create({
            date,
            reading,
            notes
        } = req.body)
        .then(() => {
            res.status(201).send()
        })
        .catch((err) => {
            console.log(err);
        })
    },
    editMeter_entries(req, res, next) {
        Meter_entries.findOne({ where: { id: req.params.id } })
        then(entry => {
            if(!entry) {
                console.log("No entry found");
                return res.status(404).send({ error: `There is no entry ${req.params.id}`})
            }
            else {
                Meter_entries.update({
                    date,
                    reading,
                    notes
                } = req.body, { where: {id: req.params.id}})
                .then((employee) => {
                    res.status(401).senc( { message: `Updated the meter-entry information to ${JSON.stringify(employee)}`} );
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        })
    },
    deleteMeter_entries(req, res, next) {
        Meter_entries.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(count => {
            if(!count) {
                return res.status(404).send({ error: 'No entry'});
            } else {
                res.status(410).send({ message: `Success in removing meter-entry ${req.params.id}`})
            }
        })
    }
}

module.exports = meter_entriesController;