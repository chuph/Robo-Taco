var db = require("../models");
var nodemailer = require('nodemailer');

module.exports = function(app) {

    app.post("/email/:name/:email/:subject/:message", function(req, res) {
        // sendMail(req.params.name, req.params.email, req.params.subject, req.params.message);
        // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eatbeforeyouspeak@gmail.com',
            pass: 'SMUstudent2017'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"EMAIL" <eatbeforeyouspeak@gmail.com>', // sender address
        to: 'colindavidmcdonnell@gmail.com', // list of receivers
        subject: req.params.subject, // Subject line
        text: req.params.message // plain text body
        // html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        //console.log('Message %s sent: %s', info.messageId, info.response);
    });
    });

    app.get("/", function(req, res) {
        db.RoboTaco.findAll({}).then(function(results) {
            var hbsObject = {
                tacos: results
            };
            res.render("index", hbsObject);
        });
    });

    app.get("/Build-Your-Own", function(req, res) {
        db.RoboTaco.findAll({}).then(function(results) {
            var hbsObject = {
                tacos: results
            };
            res.render("Build-Your-Own", hbsObject);
        });
    });

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

    app.post("Build-Your-Own", function(req, res) {
        db.RoboTaco.findAll({}).then(function(results) {
            var hbsObject = {
                tacos: results
            };
            res.render("Build-Your-Own", hbsObject);
        });
    });

    app.post("review", function(req, res) {
    db.RoboTaco.findAll({}).then(function(results) {
        var hbsObject = {

        }
    })
   })

    app.post("/api/tacos", function(req, res) {
        db.RoboTaco.create({
            taco_name: req.body.taco_name,
            ingredients: req.body.ingredients,
            price: req.body.price
        }).then(function(results) {
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
        db.RoboTaco.update({
            taco_name: req.body.taco_name,
            ingredients: req.body.ingredients,
            price: req.body.price
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(results) {
            res.json(results);
        });
    });

    app.get("/menu", function(req, res) {
        db.RoboTaco.findAll({}).then(function(results) {
            var hbsObject = {
                robotacos: results
            };
            res.render("menu", hbsObject);
        }).catch(function(err){
            console.log(err)
        });
    });

};