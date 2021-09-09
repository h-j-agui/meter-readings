const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Meter extends Model {}

Meter.init({
    location: {
        type: DataTypes.STRING
    }

}, {
    sequelize: db,
    modelName: 'meter'
});

module.exports = Meter;