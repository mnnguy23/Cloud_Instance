var express = require("express");
var router = express.Router();
var client = require("../db");
var bodyParser = require("body-parser");

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

router.get('/:lock_id', function(req, res){
	var lock_id = req.params.lock_id;
	client.query("SELECT * FROM public.lock WHERE lock_id = " + lock_id, function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results.rows);
	});
});

router.get('/remove/:lock_id', function(req, res){
  var lock_id = req.params.lock_id;
  client.query("DELETE FROM public.lock WHERE lock_id = " + lock_id , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log(true);
      res.send(true);
    }
  });
});

router.post('/post', function(req, res){
	var lock = req.body;
	console.log("lock id>>>" + lock.lock_id);
	console.log("lock state>>>" + lock.lock_state);
	console.log("lock name>>>" + lock.lock_name);
	console.log("serial number>>>" + lock.serial_number);
  console.log("address>>>" + lock.address);
  console.log("owner>>>" + lock.owner);
	client.query("INSERT INTO public.lock VALUES(" + lock.lock_id + ", " + lock.lock_state + ", " + "'" + lock.lock_name + "', '" + lock.serial_number +"', '" + lock.address + "', '" + lock.owner + "')" , function(err, results) {
    if (err) {
      throw err;
    }else{
    	console.log(true);
    	res.send(true);
    }
	});
});

router.post('/change/name/:lock_id', function(req,res){
  var lock_id = req.params.lock_id;
  var newName = req.body;
  client.query("UPDATE public.lock SET lock_name = '" + newName.name + "' WHERE lock_id = " + lock_id, function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("new name>>>" + newName.name);
      console.log(true);
      res.send(true);
    }
  });
});

router.post('/change/address/:lock_id', function(req,res){
  var lock_id = req.params.lock_id;
  var newAddress = req.body;
  client.query("UPDATE public.lock SET address = '" + newAddress.address + "' WHERE lock_id = " + lock_id, function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("new address>>>" + newAddress.address);
      console.log(true);
      res.send(true);
    }
  });
});

router.post('/change/state/:lock_id', function(req,res){
  var lock_id = req.params.lock_id;
  var newState = req.body;
  client.query("UPDATE public.lock SET lock_state = '" + newState.state + "' WHERE lock_id = " + lock_id, function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log("new state>>>" + newState.state);
      console.log(true);
      res.send(true);
    }
  });
});

module.exports = router;
