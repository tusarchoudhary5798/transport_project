const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.station = require("./station.model.js")(mongoose);
db.route = require("./route.model.js")(mongoose);
db.route = require("./activeRoute.model.js")(mongoose);

module.exports = db;
