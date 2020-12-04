const express = require("express");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); 	// add this line
const app = express();
const pg = require("pg");
const Pool = pg.Pool;
const Chocolate = require("./chocolate");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/choco';

const pool = new Pool({
    connectionString
  });

const chocolate = Chocolate(pool);


// after you added  this  restart the app
app.get("/", async function (req, res) {

	const chocolates = await chocolate.list();

	res.render("index", { 
		chocolates  
	});

});

app.get("/add", async function (req, res) {

	// const result = await pool.query("select * from chocolate");

	res.render("add", { 
		// chocolates : result.rows  
	});
	
});

app.post("/add", async function(req, res) {
    let chocName = req.body.name;
    let qty = req.body.qty
    console.log(chocName)
    console.log(qty)
    if (chocName && qty !== "") {

        await chocolate.insert(chocName, qty)
    }
    let result = await chocolate.list()

	// const result = await pool.query("select * from chocolate");
    res.render("index", {
        chocolates: result
    });

	
});

app.post("/chocolate_stock", async function(req, res){
	let {
		id
	} = req.body;

	if (req.body["plus"] == "") {
		await chocolate.incrementQtyById(id);
	} else if (req.body["minus"] == "") {
		await chocolate.decrementQtyById(id);
	}

	res.redirect("/");
});

var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Chocolate example server listening on:', portNumber);
});

