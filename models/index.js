const db = require('./db');
const Admin = require('./Admin');
const Employee = require('./Employee');
const Meter = require('./Meter');
const Reading = require('./Reading');



Reading.belongsTo(Meter, { foreignKey: 'meter_id'});
Reading.belongsTo(Employee, { foreignKey: 'employee_name'});


module.exports = {
    db, 
    Admin,
    Employee,
    Meter,
    Reading
}