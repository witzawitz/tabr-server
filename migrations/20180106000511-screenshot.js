'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
	dbm  = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db) {
	return db.createTable("screenshot", {
		id     : { type : "int", primaryKey : true, autoIncrement : true },
		height : { type : "int", unsigned : true },
		width  : { type : "int", unsigned : true },
		path   : { type : "string" },
		dt     : { type : "datetime" },
		siteID : { type : "int" }
	});
};

exports.down = function (db) {
	return db.dropTable("screenshot");
};

exports._meta = {
	"version" : 1
};
