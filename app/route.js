// exports a function, holding api
module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
      console.log('Hello World')
        res.render('index.ejs');
    });
