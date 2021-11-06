const { DataTypes, Model } = require("sequelize");
const db = require("./db");

class Reading extends Model {}

Reading.init(
  {
    meter_id: {
      type: DataTypes.INTEGER,
    },
    reading: {
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "readings",
  }
);

module.exports = Reading;
