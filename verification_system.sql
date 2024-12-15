CREATE DATABASE verification_system;

USE verification_system;

CREATE TABLE passports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  passport_number VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  nationality VARCHAR(50) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL
);

INSERT INTO passports (passport_number, name, age, nationality, issue_date, expiry_date)
VALUES
('AB1234567', 'John Doe', 34, 'American', '2015-06-15', '2025-06-14'),
('CD9876543', 'Jane Smith', 29, 'British', '2018-09-10', '2028-09-09');
