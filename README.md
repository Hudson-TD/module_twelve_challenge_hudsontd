# SQL Challenge: Employee Tracker
  
## Description

The goal of this project was to generate a command line application for managing an employee database. The main application is comprised of a list of options each tied to specific functions that carry out different tasks. To accomplish this we are taking advantage of the 'inquirer' package to generate prompts for collecting user data along with the 'mysql2' package for connecting and querying our database. For an improved user experience the 'console.table' package is being used to provide cleanly formatted tables into the terminal window for feedback. Additionally for security purposes all mysql credentials are stored in an .env file thanks to the 'dotenv' package.

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

You will first need to download the repository and insert a .env file into the main directory containing your mysql credentials. You will also need to run npm install via the terminal to ensure all packages are properly installed. After the npm install you will need to login to your mysql via the terminal and run the schema.sql & seeds.sql files. This will ensure the database exists and that there are data entries to view and edit via the application.

## Usage

Once all of the installation steps are taken care of you can type 'node server.js' into the terminal to start the application. From there you can follow along with the main directory menu to view, insert, and update the data.

Check out a short video of the functionality here: https://drive.google.com/file/d/1YzcGtc0RtgDjNV1beDWeCRaCcffI1iqX/view

## Contributing

Thank you for your interest in contributing, however I am not looking for additional contributions at this time.
  
## Questions

Please email any questions to: tylerhudson96@gmail.com 
  
Find me on GitHub: [Hudson-td](https://github.com/Hudson-td)

## Screenshot

[![Screenshot-5.png](https://i.postimg.cc/KjQ1dfGw/Screenshot-5.png)](https://postimg.cc/n9jVmvQG)