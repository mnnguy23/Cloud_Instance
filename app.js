var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var pg = require("pg");
var userRouter = require("./routes/user");
var lockRouter = require("./routes/lock");
var virtual_keysRouter = require("./routes/virtual_keys");
var activity_logRouter = require("./routes/activity_log");
var lock_user_authRouter = require("./routes/lock_user_auth");
var client = require("./db");
var SSH = require("simple-ssh");

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send("Smartlock.....");
});

app.get('/data', function(req, res){
	var msg = "Please add /activity_log, /user, /lock, or /virtual_keys to URL";
	res.send(msg);
});

app.get('/lock/:id', function(req, res){
	var useProxy = function(proxy) {
		var hostname = proxy.split("//")[1];
		var portnumber = hostname.split(":")[1];
		var config = {
    		host: hostname.split(":")[0],
    		port: portnumber,
    		user: "pi",
    		pass: "raspberry"
		};
		var ssh = new SSH(config);
		ssh.exec('python /home/pi/Desktop/ubi/lock.py', {
		    out: function(stdout) {
		        res.send(true);
		    },

		    err: function(stderr) {
		    	console.log(stderr);
		        res.send(stderr); // this-does-not-exist: command not found 
		    }
		}).start();
	}
	getProxy(req, res, useProxy);
});

app.get('/unlock/:id', function(req, res){
	var useProxy = function(proxy) {
		var hostname = proxy.split("//")[1];
		var portnumber = hostname.split(":")[1];
		var config = {
    		host: hostname.split(":")[0],
    		port: portnumber,
    		user: "pi",
    		pass: "raspberry"
		};
		var ssh = new SSH(config);
		ssh.exec('python /home/pi/Desktop/ubi/unlock.py', {
		    out: function(stdout) {
		        res.send(true);
		    },

		    err: function(stderr) {
		    	console.log(stderr);
		        res.send(stderr); // this-does-not-exist: command not found 
		    }
		}).start();
	}
	getProxy(req, res, useProxy);
});

var options1 = {
	host: 'api.weaved.com',
	path: '/v22/api/user/login/ntmathew@uh.edu/pokemon123',
	headers: {'apikey': 'WeavedDemoKey$2015'}
};

var options2 = {
	host: 'api.weaved.com',
	path: '/v22/api/device/list/all',
	headers: {'apikey': 'WeavedDemoKey$2015', 'token': ''}
};

var options3 = {
	host: 'api.weaved.com',
	path: '/v22/api/device/connect',
	headers: {
		'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': 0,
		'apikey': 'WeavedDemoKey$2015', 
		'token': ''
	},
	method: 'POST',
	data: ''
};

var getProxy = function(req, res, callback){
	var deviceConnectCallback = function(response){
		var str = "";
		response.on('data', function (chunk) {
	    	str += chunk;
	  	});

	  	response.on('end', function () {
	  		var obj = JSON.parse(str);
	    	callback(obj.connection.proxy);
	  	});
	};

	var deviceAllCallback = function(response){
	  	var str = "";
	  	response.on('data', function (chunk) {
	    	str += chunk;
	  	});

	  	response.on('end', function () {
	  		var obj = JSON.parse(str);
	  		var data = {
	  			deviceaddress: obj.devices[1].deviceaddress,
	  			hostip: obj.devices[1].devicelastip,
	  			wait: true
	  		}
	  		options3.headers['Content-Length'] = JSON.stringify(data).length;
	  		options3.data = data;
	  		connect = http.request(options3, deviceConnectCallback);
	  		connect.write(JSON.stringify(data));
	  		connect.end();
	  	});
	};

	var loginCallback = function(response) {
		var str = "";
	  	response.on('data', function (chunk) {
	    	str += chunk;
	 	 });

		response.on('end', function () {
		  	var obj = JSON.parse(str);
		  	options2.headers.token = obj.token;
		  	options3.headers.token = obj.token;
		  	http.request(options2, deviceAllCallback).end();
		});
	};

	http.request(options1, loginCallback).end();
};

app.use("/data/virtual_keys", virtual_keysRouter);
app.use("/data/lock", lockRouter);
app.use("/data/activity_log", activity_logRouter);
app.use("/data/user", userRouter);
app.use("/data/lock_user_auth", lock_user_authRouter);

app.listen(process.env.PORT || 80);
console.log('running...');