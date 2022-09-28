INSERT INTO departments(department_name)
VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Office Management'),
('Accounting');

INSERT INTO roles(title, salary, department_id)
VALUES
('Branch Manager', 115000, 1),
('Sales Representative', 60000, 2),
('HR Representative', 65000, 3),
('Warehouse Associate', 38000, 4),
('Receptionist', 30000, 5),
('Accountant', 68000, 6);

INSERT INTO employees(first_name, last_name, role_id, manager_id) 
VALUES
('Michael', 'Scott', 1, null),
('Pam', 'Beesly', 5, 1),
('Jim', 'Halpert', 2, 1),
('Toby', 'Flenderson', 4, 1),
('Stanley', 'Hudson', 2, 1),
('Darryl', 'Philbin', 3, 1);