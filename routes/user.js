var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

//Get all data from registered_users
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

//Get data from registered_users by ID
router.get('/:user_id', function(req, res){
	var id = req.params._id
	client.query("SELECT * FROM public.user WHERE user_id = " + user_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Add data to registered_users
router.post('/post', function(req, res){
	var user = req.body;
	console.log("user_id>>>" + user.user_id);
	console.log("username>>>" + user.username);
	console.log("password>>>" + user.password);
	console.log("is_child>>>" + user.is_child);
	client.query("INSERT INTO public.user VALUES(" + user.user_id + ", '" + user.username + "', " + "'" + user.password + "', " + user.is_child +")" , function(err, results) {
    if (err) {
      throw err;
    }else{
    	console.log("user added successfully........");
    	res.send("user added successfully........");
    }
	});
});

module.exports = router;