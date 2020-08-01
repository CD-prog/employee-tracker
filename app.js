const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Claudiu_39",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId)
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit"
      ]
    }).then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break
      }
    })
}

start();

function viewAllEmployees() {
  connection.query("SELECT*FROM employee;", function(err, results){
    console.table(results)
    start()
    // results.forEach((results, index) => {
    // const roleId = results.role_id;
    // connection.query('SELECT title FROM role WHERE id=' + roleId, function()
    //   })
    })
  

};


function addEmployee() {

  connection.query("SELECT id, title FROM role;", function(err,res){
    if (err) throw err;
    console.log(res)
    const choices = res.map(function(role){
     return {
       name : role.title,
       value : role.id
     }
    })

    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices
      },
    ]).then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?" ,
        {
          first_name : answer.firstName,
          last_name : answer.lastName,
          role_id : answer.role
        },
         function (err) {
          if (err) throw err;
          console.log("\nYour employee was created successfully!");
          start();
        }
        )
    });
    
  })




  function addDepartment() {

  };
  function addRole() {

  };
  function updateRole() {

  };

}
