var db = require("../models");

module.exports = function(app) {

	app.get("/api/tacos", function(req, res) {
		db.RoboTaco.findAll({}).then(function(results) {
			res.json(results);
		});
	});

	app.get("/api/tacos/:id", function(req, res) {
		db.RoboTaco.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.post("/api/tacos", function(req, res) {
		db.RoboTaco.create(
		  {
			taco_name: req.body.taco_name,
			ingredients: req.body.ingredients,
			price: req.body.price
		  }
		).then(function(results) {
			res.json(results);
		});
	});

	app.delete("/api/tacos/:id", function(req, res) {
		db.RoboTaco.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.put("/api/tacos", function(req, res) {
		db.RoboTaco.update(
		  {
		  	taco_name: req.body.taco_name,
		  	ingredients: req.body.ingredients,
		  	price: req.body.price
		  }, {
		  where: {
		  	id: req.body.id
		  }}
		).then(function(results) {
			res.json(results);
		});
	});

};