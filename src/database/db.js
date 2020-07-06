const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.MONGO_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
