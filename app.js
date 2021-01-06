//required npm packages
const mysql = require("mysql");
const inquirer = require("inquirer");

//server connection to mysql
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Why9076ba11!",
  database: "emp_trackDB",
});

//beginning prompt for when you node this project
const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "view employees",
        "view department",
        "view role",
        "add department",
        "add role",
        "add employee",
        "remove employee",
        "update employee role",
        "exit",
      ],
    })
    .then((actAnswr) => {
      switch (actAnswr.action) {
        case "view employees":
          allEmp();
          break;
        case "view department":
          allDept();
          break;
        case "view role":
          allRoles();
          break;
        case "add department":
          addDept();
          break;
        case "add role":
          addRole();
          break;
        case "add employee":
          addEmp();
          break;
        case "remove employee":
          remEmp();
          break;
        case "update employee role":
          updEmpRole();
          break;
        case "exit":
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

//function for showing all employees
const allEmp = () => {
  const query = "SELECT * FROM employee_table";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//function for showing all departments
const allDept = () => {
  const query = "SELECT * FROM department_table";
  connection.query(query, (err, resDept) => {
    if (err) throw err;
    console.table(resDept);
    start();
  });
};

//function for showing all roles
const allRoles = () => {
  const query = "SELECT * FROM role_table";
  connection.query(query, (err, resRole) => {
    if (err) throw err;
    console.table(resRole);
    start();
  });
};

//function adding new departments
const addDept = () => {
  inquirer
    .prompt([
      {
        name: "deptInput",
        type: "input",
        message: "enter department name",
      },
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        "INSERT INTO department_table SET ?",
        {
          name: res.deptInput,
        },
        function (err, res) {
          if (err) throw err;
          start();
        }
      );
    });
};

//function adding new roles
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "enter title of role",
      },
      {
        name: "salary",
        type: "input",
        message: "enter salary of role",
      },
      {
        name: "department_id",
        type: "input",
        message: "enter department id of role",
      },
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        "INSERT INTO role_table SET ?",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        function (err, res) {
          if (err) throw err;
          start();
        }
      );
    });
};

//function adding a new employee to the table
const addEmp = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter employee first name",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter employee last name",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter employee role id",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter employees manager id",
      },
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        "INSERT INTO employee_table SET ?",
        {
          first_name: res.first_name,
          last_name: res.last_name,
          role_id: JSON.parse(res.role_id),
          manager_id: JSON.parse(res.manager_id),
        },
        function (err, res) {
          if (err) throw err;
          start();
        }
      );
    });
};

//function to remove an employee from the table
const remEmp = () => {
  inquirer
    .prompt([
      {
        name: "remInput",
        type: "input",
        message: "Enter employee's ID you want to remove",
      },
    ])
    .then(function (resRem) {
      console.log(resRem);
      const query = `DELETE FROM employee_table WHERE id = ${resRem.remInput}`;
      connection.query(query, function (err, resRem) {
        if (err) throw err;
        start();
      });
    });
};

//function to update an employee role_id
const updEmpRole = () => {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Enter new role id you wish employee to be updated to",
      },
      {
        name: "upRole",
        type: "input",
        message: "Enter employee id that you wish to update role for",
      },
    ])
    .then(function (resUpd) {
      const query = `UPDATE employee_table SET role_id = ${resUpd.newRole} WHERE id = ${resUpd.upRole}`;
      connection.query(query, function (err, updRes) {
        if (err) throw err;
        start();
      });
    });
};

//connection to start the project once node is inputted
connection.connect((err) => {
  if (err) throw err;
  start();
});
