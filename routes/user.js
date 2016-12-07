var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

router.get('/', function(req, res){
	res.send("Please add /all, /user_id, or /post to URL");
});

router.get('/all', function(req, res){
	client.query("SELECT * FROM public.user", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.get('/:user_id', function(req, res){
	var user_id = req.params.user_id
	client.query("SELECT * FROM public.user WHERE user_id = " + user_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.post('/post', function(req, res){
	var user = req.body;
	client.query("INSERT INTO public.user VALUES(" + user.user_id + ", '" + user.username + "', '" + user.password + "')" , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("user_id>>>" + user.user_id);
      console.log("username>>>" + user.username);
      console.log("password>>>" + user.password);
    	console.log(true);
    	res.send(true);
    }
	});
});

module.exports = router;