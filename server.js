// Imports
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection')

// DB connection with hidden credentials via dotenv package
db.connect(err => {
    if (err) throw err;
    console.log('Database connection successful.');
    // Starting applcation after successful mysql connection
    init();
});

function init () {
    inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                // 8 options makes the prompt list act weird, holding off for now
                // 'Quit',
            ]
        })
        .then(function ({ choice }) {
            switch (choice) {
                case 'View All Departments':
                viewDepartments();
                break;

                case 'View All Roles':
                viewRoles();
                break;

                case 'View All Employees':
                viewEmployees();
                break;

                case 'Add Department':
                addDepartment();
                break;

                case 'Add Role':
                addRole();
                break;

                case 'Add Employee':
                addEmployee();
                break;

                case 'Update Employee Role':
                updateEmployee();
                break;
                // 8 options makes the prompt list act weird, holding off for now
                // case 'Quit':
                // db.end();
                // break;
            }
        });
};

//Selecting all data from 'departments' table and showing that in the terminal
function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, result, fields) {
        if (err) throw err;
          console.log('\n', "Viewing All Departments: ");
          console.table(result);
          init();
        });
};

//Selecting all data from 'roles' table and showing that in the terminal
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, result, fields) {
        if (err) throw err;
          console.log('\n', "Viewing All Roles: ");
          console.table(result);
          init();
        });
};

//Selecting all data from 'employees' table and showing that in the terminal
function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, result, fields) {
        if (err) throw err;
          console.log('\n', "Viewing All Employees: ");
          console.table(result);
          init();
        });
};

// Creating a new department and inserting data into DB
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
        validate: departmentInput => {
            if (departmentInput) {
                return true;
            } else {
                console.log('Please enter the department name.');
                return false;
            }
        }
    }]).then((answers) => {
        db.query(`INSERT INTO departments (department_name) VALUES (?)`, [answers.department], (err) => {
            if (err) throw err;
            console.log(`Added ${answers.department} to the database.`)
            init();
        });
    });
};