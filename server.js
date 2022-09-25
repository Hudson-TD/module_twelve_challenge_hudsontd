const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

inquirer
.prompt([
    {
        type: 'list',
        name: 'navigation_menu',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    },
])
.then(answer => {
    console.log('Navigating to:', answer.navigation_menu);
});