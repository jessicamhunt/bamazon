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
  displayItems();
});


//test query for errors and connection
var displayItems = function() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;

    //once connected, query to mysql grab/display data from the table named products
    console.log(res);
    // connection.end();

    //display items available for sale as table in CLI
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

//place customer order
//prompt with two messages
function selectProduct() {
  console.log("----------------------------------")
  console.log("Add an item to your shopping cart!")
  console.log("----------------------------------")
  inquirer
    .prompt(
      [{
          //ask for id of product
          name: "ID",
          type: "input",
          message: "Please enter the product ID of the item you wish to buy.",
          filter: Number,
        },
        {
          //how many units of product (quantity)
          name: "Quantity",
          type: "input",
          message: "How many would you like to order?",
          filter: Number,
        }
      ]

    )
    .then(function (answer) {
      //store user input    
      var itemID = answer.ID;
      console.log(itemID);

      var itemQuantity = answer.Quantity;
      console.log(itemQuantity);

      validateOrder(itemID, itemQuantity);

    });
};

function validateOrder(ID, Quant) {

  connection.query("SELECT * FROM products WHERE id = " + ID, function (err, res) {
    if (err) throw err
    console.log(res);

    //check if store has enough of product
    if (Quant <= res[0].quantity) {
      var total = res[0].price * Quant;
      console.log("The total cost of your order is:");
      console.log("$" + total);
      const newQuant = res[0].quantity - Quant
      //update sql database to reflect remaining quantity
      connection.query("UPDATE products SET quantity = " + newQuant + " WHERE id = " + ID);
    }
    displayItems();
  });
}
//display message for insufficient quantity of product

// afterConnection();
//display message for insufficient quantity of product

//after update, show customer the total cost of order