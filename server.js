// Imports
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./config/connection");

// DB connection with hidden credentials via dotenv package
db.connect((err) => {
  if (err) throw err;
  console.log("Database connection successful.");
  // Starting applcation after successful mysql connection
  init();
});

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        // 8 options makes the prompt list act weird, holding off for now
        // 'Quit',
      ],
    })
    .then(function ({ choice }) {
      switch (choice) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;
        // 8 options makes the prompt list act weird, holding off for now
        // case 'Quit':
        // db.end();
        // break;
      }
    });
}

// Array for storing looped values
var roleSelection = [];
// Function creating selector list out of all existing roles in the DB
function selectRole() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleSelection.push(res[i].title);
    }
  });
  return roleSelection;
}
// Array for storing looped values
var managerSelection = [];
// Function creating selector list out of all existing managers in the DB
function selectManager() {
  // Managers won't have a value for manager_id in this example so we can look for null
  db.query(
    "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerSelection.push(res[i].first_name + " " + res[i].last_name);
      }
    }
  );
  return managerSelection;
}

// Selecting all data from 'departments' table and showing that in the terminal
function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, result) {
    if (err) throw err;
    console.log("\n", "Viewing All Departments: ");
    console.table(result);
    init();
  });
}

// Selecting all data from 'roles' table and showing that in the terminal
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, result) {
    if (err) throw err;
    console.log("\n", "Viewing All Roles: ");
    console.table(result);
    init();
  });
}

// Selecting all data from 'employees' table and showing that in the terminal
function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, result) {
    if (err) throw err;
    console.log("\n", "Viewing All Employees: ");
    console.table(result);
    init();
  });
}

// Creating a new department and inserting data into DB table
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the department name:",
        validate: (departmentInput) => {
          if (departmentInput) {
            return true;
          } else {
            console.log("Department name is required.");
            return false;
          }
        },
      },
    ])
    .then((input) => {
      db.query(
        `INSERT INTO departments (department_name) VALUES (?)`,
        [input.department],
        function (err) {
          if (err) throw err;
          console.table(
            "\n",
            `The following information has been inserted into the database`,
            "\n",
            input
          );
          init();
        }
      );
    });
}

// Creating a new employee and inserting data into DB table
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please enter employee's first name:",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter employee's last name:",
      },
      {
        name: "role",
        type: "list",
        message: "Please select employee's role:",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Please select employee's manager:",
        choices: selectManager(),
      },
    ])
    .then(function (input) {
      // Adding 1 is a workaround to have the value reflect correctly since index starts at 0 and everything is 1 or higher
      // Likely a better way, but this works and is not a lot of bloat
      var roleId = selectRole().indexOf(input.role) + 1;
      var managerId = selectManager().indexOf(input.choice) + 1;
      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: input.firstName,
          last_name: input.lastName,
          role_id: roleId,
          manager_id: managerId,
        },
        function (err) {
          if (err) throw err;
          console.table(
            "\n",
            `The following information has been inserted into the database`,
            "\n",
            input
          );
          init();
        }
      );
    });
}

// Creating a new role and inserting data into DB table
function addRole() {
  db.query(
    "SELECT roles.title AS Title, roles.salary AS Salary FROM roles",
    function () {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "Please enter a title for this new role:",
          },
          {
            name: "Salary",
            type: "input",
            message: "Please enter salary for this new role:",
          },
        ])
        .then(function (input) {
          db.query(
            "INSERT INTO roles SET ?",
            {
              title: input.Title,
              salary: input.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(
                "\n",
                `The following information has been inserted into the database`,
                "\n",
                input
              );
              init();
            }
          );
        });
    }
  );
}

// Updating role value for an existing employee and inserting data into DB table
const updateEmployee = () => {
  // Creating selector list out of all employees
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    // Array for storing looped values
    const employeeChoice = [];
    res.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });

    // Creating selector list out of all roles
    db.query("SELECT * FROM roles", (err, res) => {
      if (err) throw err;
      // Array for storing looped values
      const roleChoice = [];
      res.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id,
        });
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            choices: employeeChoice,
            message: "whose role do you want to update?",
          },
          {
            type: "list",
            name: "role_id",
            choices: roleChoice,
            message: "what is the employee's new role?",
          },
        ])
        .then((input) => {
          db.query(
            `UPDATE employees SET ? WHERE ?? = ?;`,
            [{ role_id: input.role_id }, "id", input.id],
            (err, res) => {
              if (err) throw err;
              console.log("Your update has been made successfully!");
              init();
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};
