var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Claudiu_39",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
});