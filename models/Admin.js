const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Admin extends Model {}

Admin.init({
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize: db,
    modelName: 'admin'
});

module.exports = Admin;