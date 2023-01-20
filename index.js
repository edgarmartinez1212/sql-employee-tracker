const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const fs = require("fs");

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
  inquirer.prompt(questions).then((response) => {
    const selected = response.selection;
    if (selected !== "exit") {
      if (selected[0] === "view") view(selected[1]);
      if (selected[0] === "add") view(selected[1]);
      if (selected[0] === "update") view(selected[1]);
      init();
    } else {
      // exit program
      console.log("bye");
      return;
    }
  });
}

function view(selected) {
  // emp
  if (selected === "employee") {
  }
  // role
  else if (selected === "role") {
  }
  // dept
  else {
  }
}
function add(selected) {
  // emp
  if (selected === "employee") {
  }
  // role
  else if (selected === "role") {
  }
  // dept
  else {
  }
}
function update(selected) {
  // employee
}

init();
