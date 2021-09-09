const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Meter_entries extends Model {}

Meter_entries.init({
    date: {
        type: DataTypes.DATEONLY
    },
    reading: {
        type: DataTypes.INTEGER
    },
    notes: {
        type: DataTypes.TEXT
    }

}, {
    sequelize: db,
    modelName: 'meter_entries'
});

module.exports = Meter_entries;