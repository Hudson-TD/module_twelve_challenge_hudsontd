// Imports
const inquirer = require('inquirer');
//const cTable = require('console.table');
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
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Quit",
            ]
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

                case "Quit":
                db.end();
                break;
            }
        });
};