const Sequilize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  name: {
    type: Sequilize.STRING,
    allowNull: false
  },
  email: {
    type: Sequilize.STRING,
    allowNull: false
  },
  password: {
    type: Sequilize.STRING,
    allowNull: false
  }
});

//User.sync({ force: false }); //Cria tabela no BD

module.exports = User;
