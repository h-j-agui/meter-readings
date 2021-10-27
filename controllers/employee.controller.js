const Employee = require("../models/Employee");

const employeeController = {
  getEmployee(req, res, next) {
    Employee.findAll(({ username, password } = req.body))
      .then((employees) => {
        res.status(201).send(employees);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addEmployee(req, res, next) {
    console.log(req.body);
    Employee.findOne({ where: { password: req.body.password } })
      .then((employee) => {
        console.log("results from search", employee);
        if (employee) {
          res.status(409).send({ message: `pin already in use.` });
        } else {
          Employee.create(({ username, password } = req.body))
            .then((employee) => {
              res.status(201).send({
                message: `Created new employee ${employee.dataValues.username}`,
              });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(411)
                .send({ message: `Pin es mayor o menor que 4 caracteres.` });
            });
        }
      })
      .catch((err) => console.log(err));
  },
  editEmployee(req, res, next) {
    Employee.findOne({ where: { id: req.params.id } }).then((employee) => {
      if (!employee) {
        console.log("No employee found");
        return res
          .status(401)
          .send({ error: `There is no employee ${req.params.id}` });
      } else {
        Employee.update(({ username, password } = req.body), {
          where: { id: req.params.id },
        })
          .then((employee) => {
            res.status(200).send({
              message: `Updated employee's information to ${JSON.stringify(
                employee
              )}`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  },
  deleteEmployee(req, res, next) {
    console.log(req.query);
    Employee.destroy({
      where: {
        id: req.params.id,
      },
    }).then((count) => {
      if (!count) {
        return res.status(404).send({ error: "No Employee" });
      } else {
        res
          .status(410)
          .send({ message: `Success in removing id ${req.params.id}` });
      }
    });
  },
};

module.exports = employeeController;
