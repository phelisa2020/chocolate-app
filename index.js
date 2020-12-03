const express = require("express");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); 	// add this line
const app = express();
const pg = require("pg");
const Pool = pg.Pool;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/choco';

const pool = new Pool({
    connectionString
  });

// after you added  this  restart the app
app.get("/", async function (req, res) {

	const result = await pool.query("select * from chocolate");

	res.render("index", { 
		chocolates : result.rows  
	});

});

app.get("/add", async function (req, res) {

	// const result = await pool.query("select * from chocolate");

	res.render("add", { 
		// chocolates : result.rows  
	});
	
});

app.post("/add", async function (req, res) {

	// const result = await pool.query("select * from chocolate");

	res.render("add", { 
		// chocolates : result.rows  
	});
	
});

app.post("/chocolate_stock", async function(req, res){
	let {
		id
	} = req.body;

	if (req.body["minus"] == "") {
		await pool.query("update chocolate set qty = (qty + 1) where id = $1", [id]);
	} else if (req.body["plus"] == "") {
		await pool.query("update chocolate set qty = qty - 1 where id = $1 and (qty - 1) >= 0", [id]);
	}

	res.redirect("/");
});

var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Chocolate example server listening on:', portNumber);
});

