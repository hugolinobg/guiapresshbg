const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
  logging: false
});
/*
const connection = new Sequelize("guiapresshbg", "oniloguh2609", "-5d-2NQTxf", {
  host: "mysql669.umbler.com",
  dialect: "mysql",
  timezone: "-03:00",
  logging: false
});
*/
module.exports = connection;
//0900_ai
