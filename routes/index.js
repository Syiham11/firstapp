var express = require('express');
var router = express.Router();
const {CekAuth, forwardAuth} = require("../config/auth");

/* GET home page. */
router.get('/',forwardAuth, function(req, res, next) {
  res.render('index', { title: 'welcome' });
});

router.get('/dashboard', CekAuth, function(req, res, next){
  res.render("dashboard", {title: "Halaman Dashboard"});
});
module.exports = router;
