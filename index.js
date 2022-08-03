const mysql = require('mysql2');

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
                break;

            case "View all roles":
                viewAllRoles();
                break;
                
            case "View all employees":
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
    console.log("This is the viewAllDepartments function :)");
}
const viewAllRoles = () => {
    console.log("This is the viewAllRoles function :)");
}
const viewAllEmployees = () => {
    console.log("This is the viewAllEmployees function :)");
}
const addDepartment = () => {
    console.log("This is the addDepartment function :)");
}
const addRole = () => {
    console.log("This is the addRole function :)");
}
const addEmployee = () => {
    console.log("This is the addEmployee function :)");
}
const updateEmployeeRole = () => {
    console.log("This is the updateEmployeeRole function :)");
}