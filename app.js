const inquirer = require("inquirer");
const table = require("console.table");
const connection = require("./config/connection");
const prompts = require("./config/prompts");



//console.log banner here

mainMenu();

function mainMenu() {
    inquirer.prompt(prompt.mainMenu).then(function ({ task }) {
        switch (task) {
            case "View all Employees":
                viewAll();
                break;
            case "View Employees by Manager":
                viewEmployeesByManager();
                break;
            case "View Employees by Department":
                viewEmployeesByDepartment();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Department Budget":
                viewDepartmentBudget();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Remove Employee":
                deleteEmployee();
                break;
            case "Remove Department":
                deleteDepartment();
                break;
            case "Remove Role":
                deleteRole();
                break;
            case "Exit":
                console.log("You are now diconnected from the Employee Database.");

                connection.end();
                break;

        }
    });
}


