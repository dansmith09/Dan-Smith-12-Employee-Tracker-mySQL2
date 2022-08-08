SELECT
employees_with_managers.id AS employee_id,
employees_with_managers.first_name,
employees_with_managers.last_name,
employee_info.title,
employee_info.salary,
employee_info.department_name,
employees_with_managers.manager_name
FROM employee_info
JOIN employees_with_managers on employee_info.role_id = employees_with_managers.role_id;

