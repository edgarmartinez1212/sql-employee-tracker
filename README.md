# 12 SQL: Employee Tracker

## User Story

```md
AS A coding bootcamp student
I WANT a business owner to be able to view and manage the departments, roles, and employees in their company
SO THAT they can organize and plan their business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input

WHEN I start the application using 'node index'
THEN I am presented with the following options: view all employees, add a new employee, update employee role, view all roles, add a new role, view all departments, add a new department, update employee manager, view employees by manager, delete departments, delete roles, delete employees, and view sum of salaries by department

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to view all roles
THEN I am presented with the role id, job title, the salary for that role, and the department that role belongs to

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department ids and department names

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

WHEN I choose to update an employee manager
THEN I am prompted to select an employee to update and their manager or choose none if no manager, the database will update

WHEN I choose to view employees by manager
THEN I am prompted to select from one of the active managers and I am presented with a formatted table with the team members they manage

WHEN I choose to delete departments
THEN I am prompted to select a department to delete, the selected department will be deleted from the database

WHEN I choose to delte roles
THEN I am prompted to select a role to delete, the selected role will be deleted from the database

WHEN I choose to delte employees
THEN I am prompted to select a employee to delete, the selected employee will be deleted from the database

WHEN I choose to view the sum of salaries by department
THEN I am presented with a formatted table with the sum of all salaries grouped by departments
```

## Mock-Up

The following video shows an example of the application being used from the command line:

[![A video link showing the command-line employee management application with a play button overlaying the view.](./Assets/12-sql-homework-video-thumbnail.png)](https://watch.screencastify.com/v/OM0cfRu4v9BrllN0bvZs)

## Links

Video: https://watch.screencastify.com/v/OM0cfRu4v9BrllN0bvZs

Repository: https://github.com/edgarmartinez1212/sql-employee-tracker
