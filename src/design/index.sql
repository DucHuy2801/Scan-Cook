CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    hashedRt VARCHAR(200)
);

CREATE TABLE `disk` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` NVARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `image` VARCHAR(200)
);

CREATE TABLE `recipe` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` NVARCHAR(30) NOT NULL,
  `image` VARCHAR(200)
);


