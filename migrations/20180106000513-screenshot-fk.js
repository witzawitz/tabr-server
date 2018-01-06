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
	return db.addForeignKey("screenshot", "site", "screenshot_site", { "siteID" : "id" }, { onUpdate : "CASCADE", onDelete : "SET NULL" });
};

exports.down = function (db) {
	return db.removeForeignKey("screenshot", "screenshot_site");
};

exports._meta = {
	"version" : 1
};
