DROP DATABASE IF EXISTS flash_codes;
CREATE DATABASE flash_codes;
 
USE flash_codes;

CREATE TABLE cards
(
	card_id INT NOT NULL AUTO_INCREMENT,
	category VARCHAR(255) NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer TEXT(500) NOT NULL,
	PRIMARY KEY (card_id)
);