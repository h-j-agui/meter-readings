const Employee = require('../models/Employee');

const employeeController = {
    getEmployee(req, res, next) {
        Employee.findAll({
            name,
            pen
        } = req.body)
        .then(() => {
            res.status(201).send()
        })
        .catch((err) => {
            console.log(err)
        })
    },
    addEmployee(req, res, next) {
        Employee.create({
            name,
            pen
        } = req.body)
        .then(() => {
            res.status(201).send()
        })
        .catch((err) => {
            console.log(err);
        })
    },
    editEmployee(req, res, next) {
        Employee.findOne({ where: { id: req.params.id } })
        then(employee => {
            if(!employee) {
                console.log("No employee found");
                return res.status(404).send({ error: `There is no employee ${req.params.id}`})
            }
            else {
                Employee.update({
                    name,
                    pen
                } = req.body, { where: {id: req.params.id}})
                .then((employee) => {
                    res.status(401).senc( { message: `Updated employee's information to ${JSON.stringify(employee)}`} );
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        })
    },
    deleteEmployee(req, res, next) {
        Employee.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(count => {
            if(!count) {
                return res.status(404).send({ error: 'No Employee'});
            } else {
                res.status(410).send({ message: `Success in removing id ${req.params.id}`})
            }
        })
    }
}

module.exports = employeeController;