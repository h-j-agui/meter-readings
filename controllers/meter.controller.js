const Meter = require("../models/Meter");

const meterController = {
  getMeter(req, res, next) {
    Meter.findAll()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addMeter(req, res, next) {
    Meter.create(({ location } = req.body))
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editMeter(req, res, next) {
    Meter.findOne({ where: { id: req.params.id } });
    then((meter) => {
      if (!meter) {
        console.log("No meter readings found");
        return res
          .status(404)
          .send({ error: `There is not a meter ${req.params.id}` });
      } else {
        Meter.update(({ location } = req.body), {
          where: { id: req.params.id },
        })
          .then((meter) => {
            res.status(401).senc({
              message: `Updated this meter's information to ${JSON.stringify(
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
  deleteMeter(req, res, next) {
    Meter.destroy({
      where: {
        id: req.params.id,
      },
    }).then((count) => {
      if (!count) {
        return res.status(404).send({ error: "No Meter" });
      } else {
        res
          .status(410)
          .send({ message: `Success in removing Meter id ${req.params.id}` });
      }
    });
  },
};

module.exports = meterController;
