INSERT INTO department (name) 
VALUES
("marketing"),
("accounting"),
("engineering"),
("research"),
("web development");
INSERT INTO role (title, salary, department_id) 
VALUES
("project manager", 78000, 1),
("content strategist", 65000, 1),
("accountant", 73000, 2),
("finance manager", 85000, 2),
("lead engineer", 82000, 3),
("engineer", 82000, 3),
("research assistant", 35000, 4),
("lab manager", 75000, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Jordan", 5, NULL),
("Bob", "James", 4, NULL),
("Mike", "Smith", 8, NULL),
("Oprah", "Winfrey", 1, NULL),
("Angelina", "Jolie", 2, 1),
("Lebron", "James", 7, 8),
("Brad", "Pitt", 6, 5),
("Sandra", "Bulock", 3, 4);