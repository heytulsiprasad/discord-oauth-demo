require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

const session = require("express-session");
const passport = require("passport");
const discordStrategy = require("./strategies/discordStrategy");

const db = require("./database/db");

db.then(() => console.log("Connected to MongoDB")).catch((err) =>
	console.log(err)
);

const authRoute = require("./routes/auth"); // Routes
const dashRoute = require("./routes/dashboard"); // Routes

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: {
			maxAge: 60000 * 60 * 24,
		},
		saveUninitialized: false,
		name: "discord-oauth-2",
	})
);

// Setup Templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use("/auth", authRoute);
app.use("/dashboard", dashRoute);

function isAuthorized(req, res, next) {
	if (req.user) {
		// session exists
		console.log("User logged in already!");
		res.redirect("/dashboard");
		// next(); /* error: Cannot set headers after they are sent to the client */
	} else {
		console.log("User is not logged in");
		next();
	}
}

app.get("/", isAuthorized, (req, res) => {
	res.render("home");
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
