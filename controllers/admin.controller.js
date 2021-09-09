const Admin = require('../models/Admin');

const adminController = {
    getAdmin(req, res, next) {
        Admin.findAll({
            name,
            password
        } = req.body)
        .then(() => {
            res.status(201).send()
        })
        .catch((err) => {
            console.log(err);
        })
    },
    addAdmin(req, res, next) {
        Admin.create({
            name,
            password
        } = req.body) 
        .then(() => {
            res.status(201).send()
        })
        .catch((err) => {
            console.log(err)
        })
    },
    editAdmin(req, res, next) {
        Admin.findOne({
            where: {id: req.params.id}
        })
        .then(admin => {
            if(!admin) {
                console.log("No administrator found");
                return res.status(404).send({ error: `There is no admin ${req.params.id}`})
            } else {
                Admin.update({
                    name, 
                    password
                } = req.body, { where: { id: req.params.id}})
                .then((admin) => {
                    res.status(401).senc( { message: `Updated employee's information to ${JSON.stringify(employee)}`} );
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
    },
    deleteAdmin(req, res, next) {
        Admin.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(count => {
            if(!count) {
                return res.status(404).send({ error: 'No Administrator'});
            } else {
                res.status(410).send({ message: `Success in removing administrator ${req.params.id}`})
            }
        })
    }
    
}

module.exports = adminController;