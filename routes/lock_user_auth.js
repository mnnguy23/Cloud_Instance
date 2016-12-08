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

router.get('/user_authorized/:user_id', function(req, res){
  var user_id = req.params.user_id;
  var locks = [];
  var addLocks = function(obj){
    locks.push(obj);
  } 
  client.query("SELECT lock_id FROM public.lock_user_auth WHERE child_id = " + user_id, function(err, results) {
    if (err) {
      throw err;
    }else{
      var count = results.rows.length;
      for(i = 0; i<count; i++){
        client.query("SELECT * FROM public.lock WHERE lock_id = " + results.rows[i].lock_id, function(err, results2) {
          if (err) {
            throw err;
          }else{
            locks.push(results2.rows[0]);
            if(locks.length == count)
              res.send(locks);
          }
        });
      }
    }
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
  client.query("DELETE FROM public.lock_user_auth WHERE child_id = " + user_id, function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log(true);
      res.send(true);
    }
  });
});

router.post('/remove', function(req, res){
  var body = req.body;
  client.query("DELETE FROM public.lock_user_auth WHERE child_id = " + body.user_id + " AND lock_id = " + body.lock_id , function(err, results) {
    if (err) {
      throw err;
    }else{
      console.log(true);
      res.send(true);
    }
  });
})

module.exports = router;