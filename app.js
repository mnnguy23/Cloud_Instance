//Dependencies
var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var pg = require("pg");
var userRouter = require("./routes/user");
var lockRouter = require("./routes/lock");
var virtual_keysRouter = require("./routes/virtual_keys");
var activity_logRouter = require("./routes/activity_log");
var client = require("./db");

//Express
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send("Smartlock.....");
});

app.get('/data', function(req, res){
	var msg = "Please add /activity_log, /user, /lock, or /virtual_keys to URL";
	res.send(msg);
});

app.use("/data/virtual_keys", virtual_keysRouter);
app.use("/data/lock", lockRouter);
app.use("/data/activity_log", activity_logRouter);
app.use("/data/user", userRouter);

app.listen(process.env.PORT || 80);
console.log('running...');
