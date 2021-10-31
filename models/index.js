const db = require("./db");
const Admin = require("./Admin");
const Employee = require("./Employee");
const Meter = require("./Meter");
const Reading = require("./Reading");

Reading.belongsTo(Meter, { foreignKey: "meter_id" });

module.exports = {
  db,
  Admin,
  Employee,
  Meter,
  Reading,
};
