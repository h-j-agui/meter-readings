const User = require("../models/User");

const userController = {
  getUser(req, res, next) {
    User.findAll(({ username, password } = req.body))
      .then((users) => {
        res.status(201).send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addUser(req, res, next) {
    User.findOne({ where: { password: req.body.password } })
      .then((user) => {
        if (user) {
          res.status(409).send({ message: `password not availible.` });
        } else {
          User.create(({ username, password } = req.body))
            .then((user) => {
              res.status(201).send({
                message: `Created new user ${user.dataValues.username}`,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(411).send({ message: `Pin has to be 4 numbers` });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editUser(req, res, next) {
    User.findOne({ where: { id: req.params.id } }).then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ error: `There is no employee ${req.params.id}` });
      } else {
        User.update(({ username, password } = req.body), {
          where: { id: req.params.id },
        })
          .then((user) => {
            res.status(200).send({
              message: `Updated employee's information to ${JSON.stringify(
                user
              )}`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  },
  deleteUser(req, res, next) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((count) => {
      if (!count) {
        return res.status(404).send({ error: "No Employee" });
      } else {
        res
          .status(401)
          .send({ message: `Success in removing id ${req.params.id}` });
      }
    });
  },
};

module.exports = userController;
