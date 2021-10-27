const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Reading extends Model {}

Reading.init({
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

module.exports = Reading;