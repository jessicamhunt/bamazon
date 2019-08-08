//store mysql node package
var mysql = require("mysql");
//store inquirer node package
var inquirer = require("inquirer");

//store info needed to create a connection to mysql workbench database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Cobain@1989",
  database: "bamazon"
});

//test connection to mysql
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  afterConnection();
});

//once connected, query to mysql grabbing data from the table named products
//test for errors and end connection
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    
    if (err) throw err;
    console.log(res);
    console.log("-----------------------------------");
    connection.end();

    for (var i = 0; i < res.length; i++) {

      console.log(res[i].id + " | " + res[i].product + " | " + res[i].department + " | " + res[i].price + " | " + res[i].quantity);
    }

    console.log("-----------------------------------");

  });
}

//display items available for sale

//prompt with two messages

//ask for id of product

//how many units of product (quantity)

//place customer order

//check if store has enough of product

//display message for insufficient quantity of product

//update sql database to reflect remaining quantity

//after update, show customer the total cost of order