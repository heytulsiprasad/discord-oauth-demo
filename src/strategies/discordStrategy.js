const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");

let scopes = ["identify", "guilds"];

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CLIENT_REDIRECT,
			scope: scopes,
		},
		function (accessToken, refreshToken, profile, done) {
			console.log(profile);
		}
	)
);
