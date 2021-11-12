const db = require("./db");
// const Admin = require("./Admin");
const User = require("./User");
const Meter = require("./Meter");
const Reading = require("./Reading");

Reading.belongsTo(Meter, { foreignKey: "meter_id" });
Reading.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  db,
  User,
  Meter,
  Reading,
};
