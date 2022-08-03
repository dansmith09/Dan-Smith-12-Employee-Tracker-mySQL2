-- Adding department data
INSERT INTO department(name)
VALUES ("HR"), ("Marketing"), ("Sales"), ("Legal"), ("Tech");

-- Adding role data
INSERT INTO role(title, salary, department_id)
VALUES ("HR Manager",120000, 1),
    ("Associate",75000, 1),
    ("Marketing Manager",125000, 2),
    ("Salesman",90000, 3),
    ("Lawyer",180000, 4),
    ("Developer",135000, 5),
    ("DevOps",120000, 5);

-- Adding employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)