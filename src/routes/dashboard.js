const router = require("express").Router();

function isAuthorized(req, res, next) {
	if (req.user) {
		// session exists
		console.log("User is logged in");
		// console.log(req.user);
		next();
	} else {
		console.log("User is not logged in");
		res.redirect("/");
	}
}

router.get("/", isAuthorized, (req, res) => {
	res.render("dashboard", { user: req.user.username });
});

module.exports = router;
