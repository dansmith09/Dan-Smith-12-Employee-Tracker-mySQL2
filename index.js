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
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the new department?",
            name: 'name'
        }
    ])
    .then((data) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, data.name, (err, results) => {
            console.log("\nNew department added. See below:");
            viewAllDepartments();
        })
    })
}
const addRole = () => {
    let departmentArray = [];
    let departmentId = '';
    db.query(`SELECT * FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].name);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the new role?",
                name: 'title',
            },
            {
                type: 'input',
                message: "What is the salary of the new role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "What department is the role under?",
                name: 'department',
                choices: departmentArray
            }
        ])
        .then((data) => {
            db.query(`SELECT id FROM department WHERE department.name = ?`, data.department, (err, results) => {
            departmentId = results[0].id;
            db.query(`INSERT INTO role(title, salary, department_id)
            VALUES (?,?,?)`, [data.title, data.salary, departmentId], (err, results) => {
                console.log("\nNew role added. See below:");
                viewAllRoles();
            })
            });
        })
    })
}
const addEmployee = () => {
    const roleArray= [];
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
        return inquirer.prompt([
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'selection',
                choices: roleArray
            }
        ])
    })
}

const updateEmployeeRole = () => {
    console.log("This is the updateEmployeeRole function :)");
    // UPDATE 
}