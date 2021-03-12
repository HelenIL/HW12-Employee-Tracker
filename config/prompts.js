module.exports = {

    mainMenu: {
        type: 'list',
        name: 'task',
        message: 'Please make a selection:',
        choices: [
            'View Employee',
            'View Employees by Manager',
            'View Employees by Department',
            'View Departments',
            'View Roles',
            'View Department Budget',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Update Employee Role',
            'Update Employee Manager',
            'Remove Employee',
            'Remove Department',
            'Remove Role',
            'Exit',
        ],
    },

    viewManagerPrompt: (managerChoices) => [
        {
            type: "list",
            name: "managerId",
            message: "Please select Manager:",
            choices: managerChoices,
        },
    ],

    departmentPrompt: (departmentChoices) => [
        {
            type: "list",
            name: "departmentId",
            message: "Please select Department",
            choices: departmentChoices,
        },
    ],

    insertEmployee: (departmentArray, roleArray, managerArray) => [
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
            name: "department",
            type: "list",
            message: "Please select employee's department:",
            choices: departmentArray,
        },
        {
            name: "role",
            type: "list",
            message: "Please assign employee's role:",
            choices: roleArray,
        },
        {
            name: "manager",
            type: "list",
            message: "Please select employee's manager:",
            choices: managerArray,
        },
    ],

    insertDepartment: {
        name: "department",
        type: "input",
        message: "Please name new department:",
    },

    insertRole: (departmentChoices) => [
        {
            type: "input",
            name: "roleTitle",
            message: "Please name new role:",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Please enter new role's salary:",
        },
        {
            type: "list",
            name: "departmentId",
            message: "Please select department:",
            choices: departmentChoices,
        },
    ],

    updateRole: (employees, job) => [
        {
            name: "update",
            type: "list",
            message: "Please select employee to update role:",
            choices: employees,
        },
        {
            name: "role",
            type: "list",
            message: "Please select employee role:",
            choices: job,
        },
    ],

    updateManager: (employees) => [
        {
            name: "update",
            type: "list",
            message: "Please select employee to update manager:",
            choices: employees,
        },
        {
            name: "manager",
            type: "list",
            message: "Please select employee's new manager:",
            choices: employees,
        },
    ],

    deleteEmployeePrompt: (deleteEmployeeChoices) => [
        {
            type: "list",
            name: "employeeId",
            message: "Please select employee to remove:",
            choices: deleteEmployeeChoices,
        },
    ],

    deleteDepartmentPrompt: (deleteDepartmentChoices) => [
        {
            type: "list",
            name: "departmentId",
            message: "Please select department to remove:",
            choices: deleteDepartmentChoices,
        },
    ],

    deleteRolePrompt: (deleteRoleChoices) => [
        {
            type: "list",
            name: "roleId",
            message: "Please select role to remove:",
            choices: deleteRoleChoices,
        },
    ],
};