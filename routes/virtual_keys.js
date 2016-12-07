var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

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

router.get('/:key_id', function(req, res){
	var key_id = req.params.key_id
	client.query("SELECT * FROM public.virtual_keys WHERE key_id = " + key_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.post('/post', function(req, res){
	var key = req.body;
	client.query("INSERT INTO public.virtual_keys VALUES(" + key.key_id + ", " + key.lock_id + ", " + "" + key.user_id + ", '" + key.virtual_key +"')" , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("key id>>>" + key.key_id);
      console.log("lock id>>>" + key.lock_id);
      console.log("user id>>>" + key.user_id);
      console.log("virtual key>>>" + key.virtual_key);
      console.log(true);
      res.send(true);
    }
	});
});

module.exports = router;