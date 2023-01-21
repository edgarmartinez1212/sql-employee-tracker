const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const fs = require("fs");

// const { exit } = require("process");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "00000000",
    database: "tracker",
  },
  console.log("database is running")
);

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "selection",
    choices: [
      {
        name: "View All Employees",
        value: ["view", "employee"],
      },
      {
        name: "Add Employee",
        value: ["add", "employee"],
      },
      {
        name: "Update Employee Role",
        value: ["update", "employee"],
      },
      {
        name: "View All Roles",
        value: ["view", "role"],
      },
      {
        name: "Add Role",
        value: ["add", "role"],
      },
      {
        name: "View All Departments",
        value: ["view", "department"],
      },
      {
        name: "Add Department",
        value: ["add", "department"],
      },
      {
        name: "Exit",
        value: "exit",
      },
    ],
  },
];

function init() {
  // starts inquirer
  inquirer.prompt(questions).then((response) => {
    // choice
    const selected = response.selection;

    // checks if exit was chosen
    if (selected !== "exit") {
      // sends to correct function
      if (selected[0] === "view") view(selected[1]);
      if (selected[0] === "add") add(selected[1]);
      if (selected[0] === "update") update(selected[1]);
      init();
    } else {
      // exit program
      console.log("bye");
      exit();
    }
  });
}

// view all from table
function view(selected) {
  // emp
  if (selected === "employee") {
    db.query("SELECT * FROM employee", function (err, results) {
      console.table(results);
    });
  }
  // role
  else if (selected === "role") {
    db.query("SELECT * FROM role", function (err, results) {
      console.table(results);
    });
  }
  // dept
  else {
    db.query("SELECT * FROM department", function (err, results) {
      console.table(results);
    });
  }
}

// adds to selected table
function add(selected) {
  // emp
  if (selected === "employee") {
  }
  // role
  if (selected === "role") {
  }
  // dept
  if (selected === "department") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter name of the department:",
          name: "departmentName",
        },
      ])
      .then((response) => {
        console.log(response.departmentName);
        exit();
      });

    // db.query("", function (err, results) {
    //   console.log(results);
    // });
  }
}

// updates employee
function update(selected) {
  // employee
}

init();
