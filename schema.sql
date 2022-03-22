DROP DATABASE IF EXISTS BlankCards;

CREATE DATABASE BlankCards;

USE BlankCards;

CREATE TABLE cards (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(300) NOT NULL,
  position varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE players (
  id int NOT NULL AUTO_INCREMENT,
  socketID varchar(300) NOT NULL,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
);