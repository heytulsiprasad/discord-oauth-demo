const mongoose = require("mongoose");

module.exports = mongoose.connect(
	`mongodb+srv://admin:${process.env.MONGO_PWD}@cluster0.sw3vr.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
