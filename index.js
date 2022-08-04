const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'staff_db'
    },
    console.log(`Connected to the staff_db database.`)
);

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "Which action would you like to take?",
            name: 'selection',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }
    ])
    .then((data) => {
        switch (data.selection) {
            case "View all departments":
                viewAllDepartments();
                // SELECT * FROM department;
                break;

            case "View all roles":
                viewAllRoles();
                // SELECT * FROM roles
                break;
                
            case "View all employees":
                // SELECT * FROM employees
                viewAllEmployees();
                break;
            
            case "Add a department":
                addDepartment();
                break;
        
            case "Add a role":
                addRole();
                break;
            
            case "Add an employee":
                addEmployee();
                break;
                
            case "Update an employee role":
                updateEmployeeRole();
                break;
        }
    })
};

// Initiates user prompt
promptUser();

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const viewAllEmployees = () => {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
const addDepartment = () => {
    // inquirer to get new department details
}
const addRole = () => {
    console.log("This is the addRole function :)");
}
const addEmployee = () => {
    console.log("This is the addEmployee function :)");
}
const updateEmployeeRole = () => {
    console.log("This is the updateEmployeeRole function :)");
    // UPDATE 
}