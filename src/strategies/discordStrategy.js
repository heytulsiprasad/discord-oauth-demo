const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/DiscordUser");

let scopes = ["identify", "guilds"];

// responsible for storing user to `req.user` and also to `req.session`
passport.serializeUser((user, done) => {
	console.log("SERIALISE");
	done(null, user.id); // user.id gets stored inside req.session.passport.user
});

passport.deserializeUser(async (id, done) => {
	console.log("DESERIALISE");
	const user = await DiscordUser.findById(id);
	if (user) done(null, user);
});

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CLIENT_REDIRECT,
			scope: scopes,
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				const user = await DiscordUser.findOne({
					discordId: profile.id,
				});
				if (user) {
					console.log("User exists!");
					done(null, user);
				} else {
					console.log("User doesn't exists ₹₹₹");
					const newUser = await DiscordUser.create({
						discordId: profile.id,
						username: profile.username,
						guilds: profile.guilds,
					});
					const savedUser = await newUser.save();
					done(null, savedUser);
				}
			} catch (err) {
				console.log(err);
				done(err, null);
			}
		}
	)
);
