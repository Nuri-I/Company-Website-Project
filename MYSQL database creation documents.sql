CREATE DATABASE IF NOT EXISTS company_website COLLATE utf8mb4_0900_as_cs;

CREATE TABLE company_website.users  (
    id Int PRIMARY KEY,
    username Varchar(100) NOT NULL UNIQUE,
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
    product_image_url Varchar(200),
    product_name Varchar(100) NOT NULL,
    product_description VARCHAR(600) NOT NULL
    );
    
    
CREATE TABLE company_website.product_bools (
	product_id Int PRIMARY KEY,
    odd bool,
    even bool,
    red bool,
    blue bool
    );    
    
CREATE TABLE company_website.usermessages (
	name VARCHAR(50),
    email VARCHAR(100),
    subject VARCHAR(50),
    message VARCHAR(1000),
    date DATETIME
    );
    

SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_stats';

INSERT INTO company_website.users (id, username, pass, permission)
VALUES (1,"admin", '$2y$10$BbgVXNm3mn3eHkMFLQKyGe5JcLSV72iIOL7cIq1iYu1rUlZi2M2Jy', 2);

INSERT INTO company_website.site_vars (Email, Phone, adress)
VALUES ("An Email", "A phone", "An Adress");
    
# Test products, do not  run while setting up the DB for a real project
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (1 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"red 1" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (2 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"red 2" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (3 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"red 3" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (4 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"red 4" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (5 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"blue 1" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (6 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"blue 2" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (7 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"blue 3" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");
INSERT INTO company_website.product_stats (product_id, product_image_url, product_name, product_description)
VALUES (8 , "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" ,"blue 4" , "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi natus iusto id maxime cumque excepturi odio quisquam unde re Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam nesciunt omnis debitis nisi libero fugiat neque possimus suscipit iusto error quidem, et, commodi quae iste aut dicta voluptatum sint.");

INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (1 , true, false, true, false);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (2 , false, true, true, false);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (3 , true, false, true , false);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (4 , false, true, true , false);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (5 , true, false, false ,true);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (6 , false, true, false ,true);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (7 , true, false, false ,true);
INSERT INTO company_website.product_bools (product_id, odd, even, red, blue)
VALUES (8 , false, true, false ,true);