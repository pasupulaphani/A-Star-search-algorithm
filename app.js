/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var a_star = require('./lib/a_star');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.get('/path/a-star', function(req, res){

	var convertToCell = function(c) {
		var c1 = c.split(',');
		var res = [];
		c1.forEach(function(cord) {
			res.push(parseInt(cord))
		})
		return res;
	};

	var convertToWall = function (w) {
		var w1 = w.split('|');
		var res = [];
		w1.forEach(function (c) {
			res.push(convertToCell(c));
		})
		return res;
	}

	var size = req.query.size;
	var start_cell = convertToCell(req.query.start)
	var end_cell   = convertToCell(req.query.end)
	var wall_cells = []
	if (req.query.wall && req.query.wall != '') {
		wall_cells = convertToWall(req.query.wall)
	}

	var output = a_star.getPath(size, start_cell, end_cell, wall_cells)
	res.json(output);
});
