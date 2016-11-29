var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

//Get all data from registered_users
router.get('/', function(req, res){
	res.send("Please add /all, /lock_id, or /post to URL");
});

router.get('/all', function(req, res){
	client.query("SELECT * FROM public.lock", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Get data from registered_users by ID
router.get('/:lock_id', function(req, res){
	var id = req.params.lock_id
	client.query("SELECT * FROM public.lock WHERE lock_id = " + lock_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Add data to registered_users
router.post('/post', function(req, res){
	var lock = req.body;
	console.log("lock id>>>" + lock.lock_id);
	console.log("lock state>>>" + lock.lock_state);
	console.log("lock name>>>" + lock.lock_name);
	console.log("serial number>>>" + lock.serial_number);
	client.query("INSERT INTO public.lock VALUES(" + lock.lock_id + ", " + lock.lock_state + ", " + "'" + lock.lock_name + "', '" + lock.serial_number +"')" , function(err, results) {
    if (err) {
      throw err;
    }else{
    	console.log("lock added successfully........");
    	res.send("lock added successfully........");
    }
	});
});

module.exports = router;