require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const session = require("express-session");
const passport = require("passport");
const discordStrategy = require("./strategies/discordStrategy");

const authRoute = require("./routes/auth"); // Routes

app.use(
	session({
		secret: "somedrvtry",
		cookie: {
			maxAge: 60000 * 60 * 24,
		},
		saveUninitialized: false,
	})
);

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use("/auth", authRoute);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
