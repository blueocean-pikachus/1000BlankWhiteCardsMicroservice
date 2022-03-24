DROP DATABASE IF EXISTS BlankCards;

CREATE DATABASE BlankCards;

USE BlankCards;

CREATE TABLE cards (
  id int NOT NULL AUTO_INCREMENT,
  createdBy varchar(100) NOT NULL,
  dateCreated varchar(100) NOT NULL,
  cardRules varchar(500) NOT NULL,
  points int,
  image varchar(300) NOT NULL,
  tags varchar(300),
  position varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE players (
  id int NOT NULL AUTO_INCREMENT,
  socketID varchar(300) NOT NULL,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
);