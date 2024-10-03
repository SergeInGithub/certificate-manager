--liquibase formatted sql
--changeset SergeN:seed

INSERT INTO certificate.Department (name, description) VALUES
    ('IT', 'Information Technology'),
    ('ITM/FP', 'ITM/FP Department');

INSERT INTO certificate.Users (email, user_index, first_name, last_name, department_id, plant) VALUES
    ('simonz@mail.com', 'ZWOELF', 'Zwolfer', 'Simon', (SELECT id FROM certificate.department WHERE name = 'ITM/FP'), '096'),
    ('wolfgangs@mail.com', 'WOLFST', 'Tony', 'Wolfgang', (SELECT id FROM certificate.department WHERE name = 'ITM/FP'), '094'),
    ('johndoe@mail.com', 'DOJOH', 'Doe', 'John', (SELECT id FROM certificate.department WHERE name = 'IT'), '094');

INSERT INTO certificate.Supplier (name, supplier_index, city) VALUES
    ('ANDEMIS GmbH', '1', 'Stuttgart'),
    ('DAIMLER AG', '1', 'Berlin');