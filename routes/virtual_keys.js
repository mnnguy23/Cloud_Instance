var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

//Get all data from registered_users
router.get('/', function(req, res){
	res.send("Please add /all, /key_id, or /post to URL");
});

router.get('/all', function(req, res){
	client.query("SELECT * FROM public.virtual_keys", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Get data from registered_users by ID
router.get('/:key_id', function(req, res){
	var id = req.params._id
	client.query("SELECT * FROM public.virtual_keys WHERE key_id = " + key_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Add data to registered_users
router.post('/post', function(req, res){
	var key = req.body;
	console.log("key id>>>" + key.key_id);
	console.log("lock id>>>" + key.lock_id);
	console.log("user id>>>" + key.user_id);
	console.log("virtual key>>>" + key.virtual_key);
	client.query("INSERT INTO public.virtual_keys VALUES(" + key.key_id + ", " + key.lock_id + ", " + "" + key.user_id + ", '" + key.virtual_key +"')" , function(err, results) {
    if (err) {
      throw err;
    }else{
    	console.log("virtual_key added successfully........");
    	res.send("virtual_key added successfully........");
    }
	});
});

module.exports = router;