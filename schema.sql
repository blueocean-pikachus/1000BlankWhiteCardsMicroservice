DROP DATABASE IF EXISTS BlankCards;

CREATE DATABASE BlankCards;

USE BlankCards;

CREATE TABLE cards (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(300) NOT NULL,
  position varchar(100) NOT NULL,
  PRIMARY KEY (id)
);