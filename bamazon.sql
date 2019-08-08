DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, quantity)
VALUES ("tamagotchi", "electronics", 19.90, 15),
("furby", "toys", 13.9, 26),
("pogs", "games", 7.95, 100),
("skip it", "fitness", 32.50, 9),
("pogo ball", "toys", 18.25, 37),
("moon shoes", "footwear", 43.10, 11),
("easy bake oven", "appliances", 51.80, 6),
("play doh", "food", 3.75, 84),
("super soaker", "hunting", 46.10, 23),
("yak bak", "miscellaneous", 8.75, 62);

