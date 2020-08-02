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
        "View Departments",
        "Add Department",
        "View Roles",
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
        case "View Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View Roles":
          viewRoles();
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
  connection.query("SELECT * FROM employee", function(err, results){
    if (err) throw err;
    console.table('\n',results)
    })
    start()
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




  
}
function   viewDepartments() {
  connection.query("SELECT id, name FROM department;", (err, res)=>{
    if(err)throw err;
    start()
    console.table('\n',res);
})

};
function addDepartment() {
  inquirer.prompt([
    {
      name: "department",
      massage: "Enter Department Name:",
      type: "input",
    }
  ]).then(answer => {
    connection.query("INSERT INTO department (name) VALUES (?)",
      answer.department,
      function (err) {
        if (err) throw err;
        console.log('\n',"New department added ! ")
        start();
      });
  })
};
function viewRoles() {
  connection.query("SELECT * FROM role;",(err, res)=>{
    if(err)throw err;
    start()
    console.table('\n',res);
})
};
function addRole() {
  inquirer.prompt([
    {
      name: "role",
      massage: "Enter Role:",
      type: "input",
    },
    {
      name: "salary",
      massage: "Enter Salary:",
      type: "input",
    },
    {
      name: "department_id",
      massage: "Enter Department ID:",
      type: "input",
    }

  ]).then(answer => {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [answer.role, answer.salary, answer.department_id,],
      function (err) {
        if (err) throw err;
        start();
      });
  })
};
function updateRole() {

};