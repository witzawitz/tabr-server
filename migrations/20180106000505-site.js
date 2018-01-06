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
	return db.createTable("site", {
		id     : { type : "int", primaryKey : true, autoIncrement : true },
		url    : { type : "string", length : 500, unique : true, notNull : true },
		dt     : { type : "datetime" },
		userID : { type : "int" }
	});
};

exports.down = function (db) {
	return db.dropTable("site");
};

exports._meta = {
	"version" : 1
};
