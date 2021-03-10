
DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10.3),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    dep_name VARCHAR(30),
    PRIMARY KEY (id)
);