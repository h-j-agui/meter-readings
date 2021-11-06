const { Meter, Employee } = require("../models");
const Reading = require("../models/Reading");
const db = require("../models/db");

const readingController = {
  getReading(req, res, next) {
    // Reading.findAll(({ date, reading, notes } = req.body))
    Reading.findAll({ include: [Meter, Employee] })
      .then((readings) => {
        console.log("lalal");
        console.log(readings);
        res.status(201).send(readings);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getLastReadings(req, res, next) {
    db.query(
      "SELECT * FROM readings a WHERE a.reading = (SELECT MAX(b.reading) FROM readings b WHERE b.meter_id = a.meter_id )"
    )
      .then(([results, metadata]) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
        res.status(201).send(metadata);
      })
      .catch((err) => console.log(err));
  },
  getConsumption(req, res, next) {
    db.query(
      // 'select a.meter_id, a.reading, c.reading, (c.reading - a.reading) as diff, a."createdAt", c."createdAt", DATE_PART(\'day\',c."createdAt" - a."createdAt") as difdat, ((c.reading - a.reading) / DATE_PART(\'day\',c."createdAt" - a."createdAt")) as consDay, DATE_PART(\'day\',current_date - a."createdAt") as x, DATE_PART(\'day\',current_date - a."createdAt") * ((c.reading - a.reading) / DATE_PART(\'day\',c."createdAt" - a."createdAt")) + (a.reading) as estimated from readings a, readings c where a.meter_id = c.meter_id and a.reading = (select min(x1.reading) from readings x1 where x1.meter_id = a.meter_id ) and c.reading = (select max(x2.reading) from readings x2 where x2.meter_id = c.meter_id )'
      'select m.location, a.reading, c.reading, c.reading - a.reading as diff, a."createdAt", c."createdAt", DATE_PART(\'day\',c."createdAt" - a."createdAt") as difdat, ((c.reading - a.reading) / DATE_PART(\'day\',c."createdAt" - a."createdAt")) as consDay, DATE_PART(\'day\',current_date - a."createdAt") as x, DATE_PART(\'day\',current_date - a."createdAt") * ((c.reading - a.reading) / DATE_PART(\'day\',c."createdAt" - a."createdAt")) + (a.reading) as estimated from meters m, readings a, readings c where m.id = a.meter_id and a.meter_id= c.meter_id and a.reading = (select min(x1.reading) from readings x1 where x1.meter_id = a.meter_id ) and c.reading = (select max(x2.reading) from readings x2 where x2.meter_id = c.meter_id )'
    )
      .then(([results, metadata]) => {
        res.status(201).send(metadata);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addReading(req, res, next) {
    // Reading.create(({ date, reading, notes } = req.body)) porque date? no sera meter_id???
    Reading.create(({ meter_id, reading, notes, employee_id } = req.body))
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editReading(req, res, next) {
    Reading.findOne({ where: { id: req.params.id } });
    then((entry) => {
      if (!entry) {
        console.log("No entry found");
        return res
          .status(404)
          .send({ error: `There is no entry ${req.params.id}` });
      } else {
        Reading.update(({ date, reading, notes } = req.body), {
          where: { id: req.params.id },
        })
          .then((employee) => {
            res.status(401).senc({
              message: `Updated the meter-entry information to ${JSON.stringify(
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
  deleteReading(req, res, next) {
    Reading.destroy({
      where: {
        id: req.params.id,
      },
    }).then((count) => {
      if (!count) {
        return res.status(404).send({ error: "No entry" });
      } else {
        res.status(410).send({
          message: `Success in removing meter-entry ${req.params.id}`,
        });
      }
    });
  },
};

module.exports = readingController;
