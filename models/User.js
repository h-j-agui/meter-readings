const { DataTypes, Model } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((persona) => {
  if (persona.role == 1) {
    return bcrypt
      .genSalt(10)
      .then((thesalt) => {
        persona.salt = thesalt;

        return bcrypt.hash(persona.password, persona.salt);
      })
      .then((secreto) => {
        persona.password = secreto;
      });
  }
});
module.exports = User;
