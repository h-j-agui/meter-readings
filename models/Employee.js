const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Employee extends Model {}

Employee.init({
    name: {
        type: DataTypes.STRING
    },
    pen: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize: db,
    modelName: 'employee'
});

module.exports = Employee;