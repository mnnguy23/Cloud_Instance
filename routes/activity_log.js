var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

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

router.get('/:log_id', function(req, res){
	var log_id = req.params.log_id
	client.query("SELECT * FROM public.activity_log WHERE log_id = " + log_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.post('/post', function(req, res){
	var activiy_log = req.body;
	client.query("INSERT INTO public.activity_log VALUES(" + activiy_log.log_id + ", '" + activiy_log.acc_sum + "', " + activiy_log.lock_id + ", '" + activiy_log.act_time +"')" , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("log id>>>" + activiy_log.log_id);
      console.log("lock id>>>" + activiy_log.lock_id);
      console.log("acc sum>>>" + activiy_log.acc_sum);
      console.log("is child>>>" + activiy_log.act_time);
      console.log(true);
      res.send(true);
    }
	});
});

module.exports = router;