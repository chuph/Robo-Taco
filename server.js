var db = require("./models/index.js");
var sequelize = require("sequelize");
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var handlebars = require('handlebars');
var nodemailer = require('nodemailer');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.use(methodOverride('_method'));

app.use(express.static("./assets"));

var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/ingredients-api-routes.js")(app);

require("./routes/taco-api-routes.js")(app);

handlebars.registerHelper('if_eq', function(a, b, opts) {
     if(a == b)
         return opts.fn(this);
     else
         return opts.inverse(this);
});

handlebars.registerHelper('if_ls', function(a, b, opts) {
    if(a < b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("listening on PORT " + PORT);
	});
});
