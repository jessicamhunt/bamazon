//store mysql node package
var mysql = require("mysql");
//store inquirer node package
var inquirer = require("inquirer");
//cli table node package to display table in command line
var Table = require("cli-table")

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

//once connected, query to mysql grab/display data from the table named products
//test for errors and end connection
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    connection.end();

    var showProductInfo = new Table({
      head: ["ID", "Product", "Department", "Price", "Quantity"],
      colWidths: [5, 20, 20, 10, 14]
    });

    for (var i = 0; i < res.length; i++) {

      showProductInfo.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity]);
    }
    console.log(showProductInfo.toString());
    selectProduct()
  });
}

//prompt with two messages
function selectProduct() {
  console.log("----------------------------------")
  console.log("Add an item to your shopping cart!")
  console.log("----------------------------------")
  inquirer
    .prompt(
      [{
        name: "ID",
        type: "input",
        message: "Please enter the product ID of the item you wish to buy.",
        filter: Number,
      },
      {
        name: "Quantity",
        type: "input",
        message: "How many would you like to order?",
        filter: Number,
      }]

    )
    .then(function (answer) {
      
      var itemID = answer.ID;
      var itemQuantity = answer.Quantity;
      
    });
};
//display items available for sale


//ask for id of product

//how many units of product (quantity)

//place customer order

//check if store has enough of product

//display message for insufficient quantity of product

//update sql database to reflect remaining quantity

//after update, show customer the total cost of order