const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

inquirer
.prompt([
    {
        type: 'list',
        name: 'navigation_menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
])
.then(answer => {
    console.log('Navigating to:', answer.navigation_menu);
});