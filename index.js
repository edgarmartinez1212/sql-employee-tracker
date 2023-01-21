const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const fs = require("fs");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "00000000",
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

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        { name: "View all Employees", value: "VIEW EMPLOYEES" },
        { name: "View all Roles", value: "VIEW ROLES" },
        { name: "View all Departments", value: "VIEW DEPARTMENTS" },
      ],
    },
  ])
  .then((response) => {
    if (response.choice === "VIEW DEPARTMENTS") {
      viewDepartments();
    }
    if (response.choice === "VIEW EMPLOYEES") {
      viewEmployees();
    }
    if (response.choice === "VIEW ROLES") {
      viewRoles();
    }
  });
