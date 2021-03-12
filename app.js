const inquirer = require("inquirer");
const table = require("console.table");
// const figlet = require('figlet');
const connection = require("./config/connection");
const prompt = require("./config/prompts");
const chalk = require("chalk");



//console.log banner here
// figlet.text('Employee \n Tracker', {
//     font: 'Broadway',
//     horizontalLayout: 'default',
//     verticalLayout: 'default',
//     width: 300,
//     whitespaceBreak: true
// }, function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data);
// });
console.log(chalk.cyanBright(`
    
---------------------------------------------------------------------------------------
     ________                          __                                              
    /        |                        /  |                                             
    $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______       
    $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \      
    $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |     
    $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |     
    $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/      
    $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |     
    $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/      
                            $$ |                    /  \__$$ |                         
                            $$ |                    $$    $$/                          
                            $$/                      $$$$$$/                           
     __       __                                                                       
    /  \     /  |                                                                      
    $$  \   /$$ |  ______   _______    ______    ______    ______    ______            
    $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \           
    $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |          
    $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/           
    $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |                
    $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |                
    $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/                 
                                               /  \__$$ |                              
                                               $$    $$/                               
                                                $$$$$$/                                                                    
-----------------------------------------------------------------------------------------
                                                                                          
    `)
	);

mainMenu();

function mainMenu() {
    
    inquirer.prompt(prompt.mainMenu).then(function ({ task }) {
        switch (task) {
            case "View Employee":
                viewEmployee();
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
                console.log(chalk.bgRedBright.black("You are now diconnected from the Employee Database."));

                connection.end();
                break;

        }
    });
}

function viewEmployee() {
    console.log(chalk.bgBlueBright.black("View EMPLOYEES:\n"));

    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.dep_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    mainMenu();
});

	
};

function viewEmployeesByManager() {
    console.log(chalk.bgBlueBright.black("View EMPLOYEE by MANAGER:\n"));

    var query =
    `SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
	ON e.role_id = r.id
  	LEFT JOIN department d
  	ON d.id = r.department_id
  	LEFT JOIN employee m
	ON m.id = e.manager_id GROUP BY e.manager_id`;

	connection.query(query, function (err, res) {
		if (err) throw err; 

        const managerChoices = res
        .filter((mgr) => mgr.manager_id)
        .map(({ manager_id, manager }) => ({
            value: manager_id,
            name: manager,
    }));

        inquirer
        .prompt(prompt.viewManagerPrompt(managerChoices))
        .then(function (answer) {
            var query = `SELECT e.id, e.first_name, e.last_name, r.title, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role r
        ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
        ON m.id = e.manager_id
        WHERE m.id = ?`;

            connection.query(query, answer.managerId, function (err, res) {
                if (err) throw err;
                console.log(chalk.bgBlueBright.black("\nMANAGER's list of EMPLOYEES:\n"));
                console.table(res);

                mainMenu();

            });
        });
});

}

function viewEmployeesByDepartment() {
    console.log(chalk.bgBlueBright.black("View EMPLOYEE by DEPARTMENT:\n"));

    var query = `SELECT d.id, d.dep_name FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id LEFT JOIN department d
        ON d.id = r.department_id
        GROUP BY d.id, d.dep_name`;

        connection.query(query, function (err, res) {
            if (err) throw err;

            const departmentChoices = res.map((data) => ({
                value: data.id,
                name: data.name,
            }));

            inquirer
			.prompt(prompt.departmentPrompt(departmentChoices))
			.then(function (answer) {
				var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.dep_name AS department 
			FROM employee e
			JOIN role r
				ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			WHERE d.id = ?`;

				connection.query(query, answer.departmentId, function (err, res) {
					if (err) throw err;
                    console.log(chalk.bgBlueBright("\nView DEPARTMENT:\n"));
                    console.table(res);

                    mainMenu();
                });
			});
	});
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(chalk.bgBlueBright.black(`\nDEPARTMENTS:\n`));
        res.forEach((department) => {
            console.log(`ID: ${department.id} | ${department.dep_name} Department`);
        });
            mainMenu();
        });

}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(chalk.bgBlueBright.black(`\nROLES:\n`));
        res.forEach((role) => {
            console.log(chalk.yellowBright(`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`));
        })

        mainMenu();
        });
}

function viewDepartmentBudget() {
    var query = `SELECT d.dep_name, 
		r.salary, sum(r.salary) AS budget
		FROM employee e 
		LEFT JOIN role r ON e.role_id = r.id
		LEFT JOIN department d ON r.department_id = d.id
		group by d.dep_name`;

	connection.query(query, function (err, res) {
		if (err) throw err;

		console.log(chalk.bgBlueBright.black(`\nDEPARTMENTAL BUDGETS:\n`));
		res.forEach((department) => {
			console.log(
				`Department: ${department.dep_name}\n Budget: ${department.budget}\n`,
			);
		});

        mainMenu();
    });
}

const addEmployee = () => {
    let departmentArray = [];
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;

        res.forEach((element) => {
            departmentArray.push(`${element.id} ${element.dep_name}`);
        });

        let roleArray = [];
        connection.query(`SELECT id, title FROM role`, (err, res) => {
            res.forEach((element) => {
				roleArray.push(`${element.id} ${element.title}`);
        });

        let managerArray = [];
        connection.query(
            `SELECT id, first_name, last_name FROM employee`,
				(err, res) => {
					if (err) throw err;
					res.forEach((element) => {
						managerArray.push(
							`${element.id} ${element.first_name} ${element.last_name}`,
						);
					});
                    inquirer
                    .prompt(prompt.insertEmployee(departmentArray, roleArray, managerArray),
                    )
                    .then((response) => {
                        let roleCode = parseInt(response.role);
                        let managerCode = parseInt(response.manager);
                        connection.query(
                            "INSERT INTO employee SET ?",
								{
									first_name: response.firstName,
									last_name: response.lastName,
									role_id: roleCode,
									manager_id: managerCode,
								},
								(err, res) => {
									if (err) throw err;
									console.log(chalk.cyanBright("\n" + res.affectedRows + " employee created"));

                                    viewEmployee();
                                },
                                );
                            });
                    },
                );
            });
        });
    };

    function addDepartment() {
        inquirer.prompt(prompt.insertDepartment).then(function (answer) {
            var query = "INSERT INTO department (dep_name) VALUES ( ? )";
            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;
                console.log(chalk.cyanBright(
                    `You have added this department: ${answer.department.toUpperCase()}.`,
                ));
            });
            viewDepartments();
        });
    }

    function addRole() {
        var query = `SELECT * FROM department`;
    
        connection.query(query, function (err, res) {
            if (err) throw err;
            const departmentChoices = res.map(({ id, dep_name }) => ({
                value: id,
                name: `${id} ${dep_name}`,
            }));
    
            inquirer
                .prompt(prompt.insertRole(departmentChoices))
                .then(function (answer) {
                    var query = `INSERT INTO role SET ?`;
                    connection.query(
                        query,
                        {
                            title: answer.roleTitle,
                            salary: answer.roleSalary,
                            department_id: answer.departmentId,
                        },
                        function (err, res) {
                            if (err) throw err;
    
                            console.log(chalk.cyanBright("\n" + res.affectedRows + " role created"));

                            viewRoles();
					},
				);
			});
	});
}

const updateEmployeeRole = () => {
    let employees = [];
	connection.query(
		`SELECT id, first_name, last_name
  FROM employee`,
		(err, res) => {
			if (err) throw err;

			res.forEach((element) => {
				employees.push(
					`${element.id} ${element.first_name} ${element.last_name}`,
				);
			});
            let job = [];
			connection.query(`SELECT id, title FROM role`, (err, res) => {
				if (err) throw err;

				res.forEach((element) => {
					job.push(`${element.id} ${element.title}`);
				});

				inquirer.prompt(prompt.updateRole(employees, job)).then((response) => {
					let idCode = parseInt(response.update);
					let roleCode = parseInt(response.role);
					connection.query(
						`UPDATE employee SET role_id = ${roleCode} WHERE id = ${idCode}`,
						(err, res) => {
							if (err) throw err;

							console.log(
								"\n" + "\n" + res.affectedRows + " Updated successfully!",
							);

                            mainMenu();
                        },
                        );
                    });
                });
            },
        );
};

const updateEmployeeManager = () => {
    let employees = [];
	connection.query(`SELECT id, first_name, last_name FROM employee`, (err, res) => {
			res.forEach((element) => {
                employees.push(
					`${element.id} ${element.first_name} ${element.last_name}`,
				);
			});
inquirer.prompt(prompt.updateManager(employees)).then((answer) => {
    let idCode = parseInt(answer.update);
	let managerCode = parseInt(answer.manager);
	connection.query(`UPDATE employee SET manager_id = ${managerCode} WHERE id = ${idCode}`,
                (err, res) => {
                    if (err) throw err;

                    console.log("\n" + "\n" + res.affectedRows + " Updated successfully!");

                        mainMenu();
                    },
			    );
		});
	});

};

function deleteEmployee() {
	console.log("Deleting an employee");

	var query = `SELECT e.id, e.first_name, e.last_name
      FROM employee e`;

	connection.query(query, function (err, res) {
		if (err) throw err;
        const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
			value: id,
			name: `${id} ${first_name} ${last_name}`,
		}));

		inquirer
			.prompt(prompt.deleteEmployeePrompt(deleteEmployeeChoices))
			.then(function (answer) {
				var query = `DELETE FROM employee WHERE ?`;
                connection.query(query, { id: answer.employeeId }, function (err, res) {
					if (err) throw err;

					console.log("\n" + res.affectedRows + "  employee deleted");

                    mainMenu();
                });
			});
	});
}

function deleteDepartment() {
	console.log("\nRemove a Department:\n");

	var query = `SELECT e.id, e.name FROM department e`;

	connection.query(query, function (err, res) {
		if (err) throw err;
        const deleteDepartmentChoices = res.map(({ id, dep_name }) => ({
			value: id,
			name: `${id} ${dep_name}`,
		}));
        inquirer
			.prompt(prompt.deleteDepartmentPrompt(deleteDepartmentChoices))
			.then(function (answer) {
				var query = `DELETE FROM department WHERE ?`;
                connection.query(query, { id: answer.departmentId }, function (
					err,
					res,
				) {
					if (err) throw err;

					console.log("\n" + res.affectedRows + " department deleted");
                    viewDepartments();
				});
			});
	});
}

function deleteRole() {
	console.log("Deleting a role");

	var query = `SELECT e.id, e.title, e.salary, e.department_id FROM role e`;

	connection.query(query, function (err, res) {
		if (err) throw err;
        const deleteRoleChoices = res.map(({ id, title }) => ({
			value: id,
			name: `${id} ${title}`,
		}));

		inquirer
			.prompt(prompt.deleteRolePrompt(deleteRoleChoices))
			.then(function (answer) {
				var query = `DELETE FROM role WHERE ?`;
                connection.query(query, { id: answer.roleId }, function (err, res) {
					if (err) throw err;

					console.log("\n" + res.affectedRows + " role deleted");

                    viewRoles();
				});
			});
	});
}