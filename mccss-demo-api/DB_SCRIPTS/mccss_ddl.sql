-- Create database
DROP DATABASE IF EXISTS mccss;
CREATE database mccss;

-- Create DB user and grant privileges
CREATE USER 'mccssuser'@'%' IDENTIFIED BY 'Passw0rd';
GRANT ALL PRIVILEGES ON mccss.* TO 'mccssuser'@'%';

USE mccss;

-- Create table
CREATE TABLE user (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(50) NULL,
    last_name varchar(50) NULL,
    email varchar(50) NOT NULL UNIQUE,
    postal_code varchar(7) NOT NULL,
    created_on datetime(6) NOT NULL,
    updated_on datetime(6) NULL
);

