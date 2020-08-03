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
      message: "What would you like to do?\n",
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
departmentList = [];
managerList = [];

function getManager() {
  connection.query('SELECT*FROM employee', (err, results) => {
    if (err) throw err;
    for (let i = 0; i < results.length; i++)
      managerList.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name)
  })
};
function getDepartment() {
  connection.query('SELECT*FROM department', (err, results) => {
    if (err) throw err;
    for (let i = 0; i < results.length; i++)
      departmentList.push(results[i].id + ' ' + results[i].name)
  })
};
function viewAllEmployees() {
  connection.query(
    `SELECT employee.id ID, employee.first_name FirstName, employee.last_name LastName, department.name DEPARTMENT, role.title ROLE, role.salary SALARY, employee.manager_id MANAGER
    FROM employee 
    LEFT JOIN role on (employee.role_id = role.id)
    LEFT JOIN department on (role.department_id = department.id)
    LEFT JOIN employee manager on (employee.manager_id = manager.id)
    ORDER BY employee.id;`,
    (err, results) => {
      if (err) throw err;
      console.table('\n', results)
      start()
    })
};
function addEmployee() {
  getManager();
  connection.query("SELECT id, title FROM role;", function (err, res) {
    if (err) throw err;
    const choices = res.map(function (role) {
      return {
        name: role.title,
        value: role.id
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
      {
        name: "managers",
        type: "list",
        message: "Who is the employee's manager?",
        choices: managerList
      },
    ]).then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.managers.match(/\d+/g),
        },
        function (err) {
          if (err) throw err;
          console.log("\nEmployee was added successfully!", '\n');
          start();
        }
      )
    });

  })
};
function viewDepartments() {
  connection.query("SELECT department.id ID, department.name DEPARTMENT FROM department;", (err, res) => {
    if (err) throw err;
    console.table('\n', res);
    start()
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
        console.log('\n', "New department added successfully ! ", '\n')
        start();
      });
  })
};
function viewRoles() {
  connection.query("SELECT role.id ID, role.title ROLE, role.salary SALARY, role.department_id DEPARTMENT_ID FROM role;", (err, res) => {
    if (err) throw err;
    console.table('\n', res);
    start()
  })
};
function addRole() {
  getDepartment();
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
      massage: "Choose Department:",
      type: "list",
      choices: departmentList
    }

  ]).then(answer => {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [answer.role, answer.salary, answer.department_id.match(/\d+/g)],
      function (err) {
        if (err) throw err;
        console.log('\n', "New role added successfully ! ", '\n')
        start();
      });
  })
};
function updateRole() {

};