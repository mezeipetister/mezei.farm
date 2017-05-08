var express = require('express');
var router = express.Router();

// Managing multiple languages detecting the main browser language
router.use(function(req, res, next) {
  var isItHu = req.acceptsLanguages('hu');
  if(isItHu) {
    var lang = 'default';
  } else {
    var lang = 'english';
  }
  var fs = require('fs');
  res.locals.text = JSON.parse(fs.readFileSync('lang/' + lang + '.json', 'utf8'));
  res.locals.path = req.url;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title = res.locals.text["title_index"];
  res.render('index');
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: res.locals.text["title_index"] });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: res.locals.text["title_about"] });
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: res.locals.text["title_products"] });
});

module.exports = router;
