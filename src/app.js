require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
	res.send("Hello YT");
});

app.get("/dashboard", (req, res) => {
	res.json({
		msg: "Good",
		status: "Not 400",
	});
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
