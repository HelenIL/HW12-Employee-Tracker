USE employeeDB;

INSERT INTO department (dep_name)
VALUE ("Sales");
INSERT INTO department (dep_name)
VALUE ("Engineering");
INSERT INTO department (dep_name)
VALUE ("Finance");
INSERT INTO department (dep_name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1); 
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1); 
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2); 
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2); 
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 150000, 3); 
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3); 
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4); 
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Assistant", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bender", "Rodriguez", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Turanga", "Leela", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Phillip", "Fry", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hubert", "Farnsworth", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Wong", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hermes", "Conrad", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Zoidberg", 6,6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Scruffy", "Scruffington", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wash", "Bucket", 7, 7);

