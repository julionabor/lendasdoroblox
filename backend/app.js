require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();
// Solve CORS
app.use(cors({ credentials: true, origin: "*" }));
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "https://lendasdoroblox.onrender.com/");
	
	next();
});
// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// db connection
require("./config/db.js");


// routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
	console.log(`App rodando na porta ${port}`);
});
