const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Admin extends Model {}

Admin.init({
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    salt: {
        type: DataTypes.STRING
    }

}, {
    sequelize: db,
    modelName: 'admin'
});

module.exports = Admin;