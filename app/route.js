module.exports = function(app, passport, db) {
  // routes for the home/root page
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // routes for the login page
  app.get('/login', function(req, res) {
    res.render('login.ejs');
  });

  // routes for the sign up page
  app.get('/signup', function(req, res) {
    res.render('signup.ejs');
  });

  // routes for the house page
  app.get('/house', function(req, res) {
    res.render('house.ejs');
  });
};
