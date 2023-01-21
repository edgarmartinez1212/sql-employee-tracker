const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
require("dotenv").config();
console.log(process.env);

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.PW,
    database: "tracker",
  },
  console.log(`Connected to the tracker database.`)
);

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter department name",
      name: "departmentName",
    })
    .then((response) => {
      console.log(`INSERT INTO department (name) VALUES (${response.departmentName})`);
      return;
    });
}
function addEmployee() {}
function addRole() {}

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        { name: "View all Employees", value: "VIEW EMPLOYEES" },
        { name: "Add a new Employee", value: "ADD EMPLOYEE" },
        { name: "Update Employee Role", value: "UPDATE EMPLOYEE ROLE" },
        { name: "View all Roles", value: "VIEW ROLES" },
        { name: "Add a new Role", value: "ADD ROLE" },
        { name: "View all Departments", value: "VIEW DEPARTMENTS" },
        { name: "Add a new Department", value: "ADD DEPARTMENT" },
        // -- BONUS --
        // update employee managers
        // { name: "Update Employee Manager", value: "UPDATE MANAGER" },

        // view employees by manager
        // { name: "View Employees by Manager", value: "VIEW EMPLOYEE BY MANAGERS" },

        // delete departments
        // { name: "Delete Departments", value: "DELETE DEPARTMENTS" },

        // delete roles
        // { name: "Delete Roles", value: "DELETE ROLES" },

        // delete employees
        // { name: "Delete Employees", value: "DELETE EMPLOYEES" },

        // view total utilized budged of a dept (sum of salaries of all emps dept)
        // { name: "View the sum of salaires of all departments", value: "BONUS_RENAME" },
        { name: "Exit", value: "EXIT" },
      ],
    },
  ])
  .then((response) => {
    if (response.choice === "VIEW EMPLOYEES") viewEmployees();

    if (response.choice === "ADD EMPLOYEE") {
    }

    if (response.choice === "UPDATE EMPLOYEE ROLE") {
    }

    if (response.choice === "VIEW ROLES") viewRoles();

    if (response.choice === "ADD ROLE") {
    }

    if (response.choice === "VIEW DEPARTMENTS") viewDepartments();

    if (response.choice === "ADD DEPARTMENT") addDepartment();

    if (response.choice === "EXIT") {
      // prompt.ui.close();
      // exit();
    }
  });
