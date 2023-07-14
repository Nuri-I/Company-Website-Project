CREATE DATABASE IF NOT EXISTS company_website COLLATE utf8mb4_0900_as_cs;

CREATE TABLE company_website.users  (
    id Int PRIMARY KEY,
    email Varchar(100) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    permission Int NOT NULL
);


CREATE TABLE company_website.site_vars (
    email Varchar(100),
    phone VARCHAR(30),
    adress VARCHAR(255)
    );

CREATE TABLE company_website.product_stats (
	product_id Int PRIMARY KEY,
    product_name Varchar(100) NOT NULL UNIQUE,
    product_description VARCHAR(255) NOT NULL
    );
    
CREATE TABLE company_website.product_bools (
	product_id Int PRIMARY KEY,
    simpe bool,
    premium bool,
    red bool,
    blue bool
    );
    
INSERT INTO site_vars (email, phone, adress)
VALUES ("first-email-in-db" , "first-phone-in-db" , "first-adress-in-db");