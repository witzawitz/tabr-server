var express      = require('express');
var app          = express();
var http         = require('http');
var bodyParser   = require('body-parser');
var config       = require('./config/database.json');
var mysql        = require('mysql');
var randomstring = require("randomstring");
var dateformat   = require("dateformat");

var dt = {
	current : function () {
		var now = new Date();
		return dateformat(now, "yyyy-mm-dd HH:MM:ss");
	}
};

var db = mysql.createConnection(config.db, function (error) {
	if (error) {
		throw error;
	}
});

var user = {
	guid          : null,
	create        : function () {
		this._generateGuid();
		db.query("INSERT INTO `user` (`guid`, `dt`) VALUES ( ? , ?)", [ user.guid, dt.current() ], function (error, results, fields) {
			if (error)
				throw error;
		});
	},
	find          : function (guid) {
		db.query("SELECT * FROM `user` WHERE `active`=1 AND `guid`=?", [ guid ], function (error, results, fields) {
			if (!error && results.length === 1)
				user.guid = guid;
		});
	},
	_generateGuid : function () {
		user.guid = randomstring.generate(24, 'hex');
		db.query("SELECT * FROM `user` WHERE `guid`=?", [ user.guid ], function (error, results, fields) {
			if (error)
				throw error;
			if (results.length > 0)
				user._generateGuid();
		});
	}
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', function (req, res) {
	res.send('')
});

app.post('/user', function (req, res) {
	user.create();
	res.send(user.guid);
});

app.post('/screenshot', function (req, res) {
	var data = req.body;
	user.find(data.user);
	res.send(user);
});

app.listen(3020);
// var server = http.createServer(app);
// db.end();