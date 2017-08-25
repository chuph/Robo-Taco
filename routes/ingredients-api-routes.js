var db = require("../models");
// var Builder = require("../assets/app/taco-builder-logic.js");

module.exports = function(app) {

   app.get("/", function(req, res) {
        // db.reviews.findAll({}).then(function(results) {
        //     var hbsObject = {
        //         reviews: results
        //     }
            res.render("index");
        // });
    });

   app.get("/Build-Your-Own", function(req, res) {
        db.ingredients.findAll({}).then(function(results) {
            var hbsObject = {
                ingredients: results
            }
            res.render("Build-Your-Own", hbsObject);
        });
    });


   app.get("/api/ingredients", function(req, res) {
        db.ingredients.findAll({}).then(function(results) {
            res.json(results);
        });
    });

   app.get("/api/ingredients/:id", function(req, res) {
        db.ingredients.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            res.json(results);
        });
    });

   app.post("/api/ingredients", function(req, res) {
        db.ingredients.create({
            item_name: req.body.item_name,
            type: req.body.type,
            price: req.body.price
        }).then(function(results) {
            res.json(results);
        });
    });

   app.delete("/api/ingredients/:id", function(req, res) {
        db.ingredients.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            res.json(results);
        });
    });

   app.put("/api/ingredients", function(req, res) {
        db.ingredients.update({
            item_name: req.body.item_name,
            type: req.body.type,
            price: req.body.price
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(results) {
            res.json(results);
        });
    });

   app.get("/contact", function(req, res) {
        // db.reviews.findAll({}).then(function(results) {
        //     var hbsObject = {
        //         reviews: results
        //     }
            res.render('contact');
        // });
    });

   app.post("/contact", function(req, res) {
    db.reviews.create({
        name: req.body.reviewname,
        review: req.body.feedback
    }).then(function(results) {
        res.json(results);
    });
   });

   app.get("/locations", function(req, res) {
        // db.reviews.findAll({}).then(function(results) {
        //     var hbsObject = {
        //         reviews: results
        //     }
            res.render('locations');
        // })
    });



};

