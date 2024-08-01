CREATE DATABASE quizit;
USE quizit;

CREATE TABLE Users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL, 
    UNIQUE (username, email)

);

CREATE TABLE RefreshTokens (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    refresh_token TEXT NOT NULL,
    PRIMARY KEY (id)
);