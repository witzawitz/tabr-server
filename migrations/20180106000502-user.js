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
	return db.createTable("user", {
		id     : { type : "int", primaryKey : true, autoIncrement : true },
		guid   : { type : "string", length : 24, unique : true, notNull : true },
		dt     : { type : "datetime" },
		active : { type : "boolean", default : true }
	});
};

exports.down = function (db) {
	return db.dropTable("user");
};

exports._meta = {
	"version" : 1
};
