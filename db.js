//Dependencies
var pg = require("pg");

//Connect to postgres
var connectionString = "postgres://adfrwyojzkasaz:b_Tfm3fjz2ilQTJEeGn3DU-8E7@ec2-50-19-219-148.compute-1.amazonaws.com:5432/dc3ulh3o5kjerj";
var client = new pg.Client({
	user: "adfrwyojzkasaz",
	password: "b_Tfm3fjz2ilQTJEeGn3DU-8E7",
	database: "dc3ulh3o5kjerj",
	port: 5432,
	host: "ec2-50-19-219-148.compute-1.amazonaws.com",
	ssl: true
});
client.connect();
module.exports = client;
