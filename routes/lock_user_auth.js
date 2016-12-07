var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

router.get('/', function(req, res){
	res.send("Please add /all, /key_id, or /post to URL");
});

router.get('/all', function(req, res){
	client.query("SELECT * FROM public.lock_user_auth", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.get('/user/:user_id', function(req, res){
	var user_id = req.params.user_id;
	client.query("SELECT * FROM public.lock_user_auth WHERE child_id = " + user_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.get('/lock/:lock_id', function(req, res){
  var lock_id = req.params.lock_id;
  client.query("SELECT * FROM public.lock_user_auth WHERE lock_id = " + lock_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
  });
});

router.post('/post', function(req, res){
	var auth = req.body;
	client.query("INSERT INTO public.lock_user_auth VALUES(" + auth.lock_id + ", " + auth.user_id + ")" , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("lock id>>>" + auth.lock_id);
      console.log("user id>>>" + auth.user_id);
    	console.log(true);
    	res.send(true);
    }
	});
});

router.get('/remove/lock/:lock_id', function(req, res){
  var lock_id = req.params.lock_id;
  client.query("DELETE FROM public.lock_user_auth WHERE lock_id = "+ lock_id , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log(true);
      res.send(true);
    }
  });
});

router.get('/remove/user/:user_id', function(req, res){
  var user_id = req.params.user_id;
  client.query("DELETE FROM public.lock_user_auth WHERE child_id = " + user_id , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log(true);
      res.send(true);
    }
  });
});

module.exports = router;