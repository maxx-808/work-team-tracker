DROP DATABASE IF EXISTS emp_trackDB;

CREATE DATABASE emp_trackDB;

USE emp_trackDB;

CREATE TABLE department_table (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role_table (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary decimal(7,2),
    department_id INT,

    CONSTRAINT fk_department_table
    FOREIGN KEY(department_id)
    REFERENCES department_table(id),

    PRIMARY KEY (id)
);

CREATE TABLE employee_table (
    id INT AUTO_INCREMENT NOT NULL,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT,
    manager_id INT,
    
    CONSTRAINT fk_role_table
    FOREIGN KEY(role_id)
    REFERENCES role_table(id),

    CONSTRAINT fk_employee_table
    FOREIGN KEY(manager_id)
    REFERENCES employee_table(id),
    
    PRIMARY KEY (id)
);