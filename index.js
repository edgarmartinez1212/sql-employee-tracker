const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.PW,
    database: process.env.DB,
  },
  console.log(`Connected to the tracker database.`)
);

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    init();
  });
}

function viewEmployees() {
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
    console.table(results);
    init();
  });
}

function viewRoles() {
  db.query("SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id ORDER BY role.id ASC;", function (err, results) {
    console.table(results);
    init();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter new department name",
      name: "department",
    })
    .then((response) => {
      db.query("INSERT INTO department (name) VALUES (?)", response.department, function (err, results) {
        console.log("Department successfully added.");
        init();
      });
    });
  // added department_name to the database
}

function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    const roles = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    db.query("SELECT * FROM employee", function (err, results) {
      const managers = results.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
      managers.unshift({ name: "None", value: null });

      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter first name of new Employee",
            name: "firstName",
          },
          {
            type: "input",
            message: "Enter last name of new employee",
            name: "lastName",
          },
          {
            type: "list",
            message: "What is the new employees role?",
            name: "role",
            choices: roles,
          },
          {
            type: "list",
            message: "Who is the new employees manager?",
            name: "manager",
            choices: managers,
          },
        ])
        .then((response) => {
          db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstName, response.lastName, response.role, response.manager], function (err, results) {
            console.log("Role successfully added.");
            init();
          });
        });
    });
  });
  //
  // enter employees first name
  // enter employees last name
  // what is the employees role? (list of roles)
  // who is the employees manager? (list of managers)
  // added (first_name last_name) to the database
  // init();
}

function addRole() {
  // enter name of role
  // enter salary of role
  // what department does the role belong to? (list of departments)
  // added role_name to the database
  db.query("SELECT * FROM department", function (err, results) {
    const departments = results.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter title of new role",
          name: "title",
        },
        {
          type: "input",
          message: "Enter salary of new role",
          name: "salary",
        },
        {
          type: "list",
          message: "What department does the role belong to?",
          name: "department",
          choices: departments,
        },
      ])
      .then((response) => {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.department], function (err, results) {
          console.log("Role successfully added");
          init();
        });
      });
  });
}

function updateEmployeeRole() {
  // which employees rold do you want to update? (list of employees)
  // which role do you want to assign the selected employee? (list of roles)
  // updated employees role
  db.query("SELECT * FROM employee", function (err, results) {
    const employees = results.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));

    db.query("SELECT * FROM role", function (err, results) {
      const roles = results.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee's role do you want to update?",
            name: "employee",
            choices: employees,
          },
          {
            type: "list",
            message: "Which role do you want to assign to the selected employee?",
            name: "role",
            choices: roles,
          },
        ])
        .then((response) => {
          db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role, response.employee], function (err, results) {
            console.log("Updated employee");
            init();
          });
        });
    });
  });
}

// --- BONUS ---
function updateManager() {
  // select employee you want to update their manager from list (show their manager?) - get id
  // select a manager you want to add from list - get id
  // update query
  db.query("SELECT * FROM employee", function (err, results) {
    const employees = results.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));

    const managers = [];
    managers.push({
      name: "None",
      value: null,
    });
    employees.forEach((employee) => {
      managers.push(employee);
    });

    inquirer
      .prompt([
        {
          type: "list",
          message: "Select employee to update their manager",
          name: "selectedEmployee",
          choices: employees,
        },
        {
          type: "list",
          message: "Select employees new manager",
          name: "selectedManager",
          choices: managers,
        },
      ])
      .then((response) => {
        db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [response.selectedManager, response.selectedEmployee], function (err, results) {
          console.log("Manager updated");
          init();
        });
      });
  });
}
function viewEmployeeByManager() {
  // select a manager - get id
  // select all from employee where manager_id = selected_manager_id
  db.query("SELECT DISTINCT mngr.id, mngr.first_name, mngr.last_name FROM employee as emp JOIN employee AS mngr ON emp.manager_id = mngr.id", function (err, results) {
    const managers = results.map((manager) => ({
      name: manager.first_name + " " + manager.last_name,
      value: manager.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select a manager to view their employees",
          name: "manager",
          choices: managers,
        },
      ])
      .then((response) => {
        db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id WHERE manager.id = ?;", response.manager, function (err, results) {
          console.table(results);
          init();
        });
      });
  });
}
function deleteDepartment() {
  // select a dept to delete from list - get id
  // delete query
  db.query("SELECT * FROM department", function (err, results) {
    const departments = results.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          message: "select a department to delete",
          name: "department",
          choices: departments,
        },
      ])
      .then((response) => {
        db.query("DELETE FROM department WHERE id = ?", response.department, function (err, results) {
          console.log("Department deleted");
          init();
        });
      });
  });
}
function deleteRole() {
  // select a role to delete from list - get id
  // delete query
  db.query("SELECT * FROM role", function (err, results) {
    const roles = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          message: "Select role to delete (all employees tied to this role will be deleted)",
          name: "role",
          choices: roles,
        },
      ])
      .then((response) => {
        db.query("DELETE FROM role WHERE id = ?", response.role, function (err, results) {
          console.log("Role deleted");
          init();
        });
      });
  });
}
function deleteEmployee() {
  // select a employee to delete from list - get id
  // delete query
  db.query("SELECT * FROM employee", function (err, results) {
    const employees = results.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          message: "Select employee to delete",
          name: "employee",
          choices: employees,
        },
      ])
      .then((response) => {
        db.query("DELETE FROM employee WHERE id = ?", response.employee, function (err, results) {
          console.log("Employee deleted");
          init();
        });
      });
  });
}
function viewSumSalaries() {
  db.query("select dept.name, sum(role.salary) as 'salary total' from employee as emp left join role on emp.role_id = role.id join department as dept on role.department_id = dept.id group by role.department_id;", function (err, results) {
    console.table(results);
    init();
  });
}

function init() {
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
          { name: "Update Employee Manager", value: "UPDATE MANAGER" },

          // view employees by manager
          { name: "View Employees by Manager", value: "VIEW EMPLOYEE BY MANAGERS" },

          // delete departments
          { name: "Delete Departments", value: "DELETE DEPARTMENTS" },

          // delete roles
          { name: "Delete Roles", value: "DELETE ROLES" },

          // delete employees
          { name: "Delete Employees", value: "DELETE EMPLOYEES" },

          // view total utilized budged of a dept (sum of salaries of all emps dept)
          { name: "View the sum of salaires by department", value: "VIEW SUM" },
          { name: "Exit", value: "EXIT" },
        ],
      },
    ])
    .then((response) => {
      if (response.choice === "VIEW EMPLOYEES") viewEmployees();
      if (response.choice === "ADD EMPLOYEE") addEmployee();
      if (response.choice === "UPDATE EMPLOYEE ROLE") updateEmployeeRole();
      if (response.choice === "VIEW ROLES") viewRoles();
      if (response.choice === "ADD ROLE") addRole();
      if (response.choice === "VIEW DEPARTMENTS") viewDepartments();
      if (response.choice === "ADD DEPARTMENT") addDepartment();
      if (response.choice === "EXIT") process.exit();

      // --- BONUS ---
      if (response.choice === "UPDATE MANAGER") updateManager();
      if (response.choice === "VIEW EMPLOYEE BY MANAGERS") viewEmployeeByManager();
      if (response.choice === "DELETE DEPARTMENTS") deleteDepartment();
      if (response.choice === "DELETE ROLES") deleteRole();
      if (response.choice === "DELETE EMPLOYEES") deleteEmployee();
      if (response.choice === "VIEW SUM") viewSumSalaries();

      // init();
    });
}

init();
