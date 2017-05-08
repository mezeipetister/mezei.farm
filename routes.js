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
  req.languageFile = JSON.parse(fs.readFileSync('lang/' + lang + '.json', 'utf8'));
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: req.languageFile["title-index"], path: req.url, text: req.languageFile });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: req.languageFile["title-about"], path: req.url });
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: req.languageFile["products"], path: req.url });
});

module.exports = router;
