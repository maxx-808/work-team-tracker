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
        "view employees by department",
        "view employees by manager",
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
        case "view employees by department":
          allEmpDept();
          break;
        case "view employees by manager":
          allEmpMang();
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

//function for showing all employees based on department
const allEmpDept = () => {
  const query = "SELECT * FROM employee_table GROUP BY department_id";
  connection.query(query, (err, resDe) => {
    if (err) throw err;
    console.table(resDe);
    start();
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
      const query = `DELETE FROM employee_table WHERE ID = ${resRem.remInput}`;
      console.log(query);
      connection.query(query, { id: resRem.remInput }, (err, res) => {
        if (err) throw err;
        console.log(`${resRem.remInput} has been deleted`);
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
