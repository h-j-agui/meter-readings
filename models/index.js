const db = require('./db');
const Admin = require('./Admin');
const Employee = require('./Employee');
const Meter = require('./Meter');
const Meter_enteries = require('./Meter_entries');



Meter_enteries.belongsTo(Meter, { foreignKey: 'meter_id'});
Meter_enteries.belongsTo(Employee, { foreignKey: 'employee_name'});


module.exports = {
    db, 
    Admin,
    Employee,
    Meter,
    Meter_enteries
}