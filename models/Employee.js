const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Employee extends Model {}

Employee.init({
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.INTEGER,
        validate: {
            len: [4, 4]
        }
    }

}, {
    sequelize: db,
    modelName: 'employee'
});

module.exports = Employee;

