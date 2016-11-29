var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

//Get all data from registered_users
router.get('/', function(req, res){
	res.send("Please add /all, /log_id, or /post to URL");
});

router.get('/all', function(req, res){
	client.query("SELECT * FROM public.activity_log", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Get data from registered_users by ID
router.get('/:log_id', function(req, res){
	var id = req.params.log_id
	client.query("SELECT * FROM public.activity_log WHERE log_id = " + log_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

//Add data to registered_users
router.post('/post', function(req, res){
	var activiy_log = req.body;
	console.log("log id>>>" + activiy_log.log_id);
	console.log("lock id>>>" + activiy_log.acc_sum);
	console.log("acc sum>>>" + activiy_log.lock_id);
	console.log("is child>>>" + activiy_log.act_time);
	client.query("INSERT INTO public.activity_log VALUES(" + activiy_log.log_id + ", '" + activiy_log.acc_sum + "', " + activiy_log.lock_id + ", '" + activiy_log.act_time +"')" , function(err, results) {
    if (err) {
      throw err;
    }else{
    	console.log("activity_log added successfully........");
    	res.send("activity_log added successfully........");
    }
	});
});

module.exports = router;