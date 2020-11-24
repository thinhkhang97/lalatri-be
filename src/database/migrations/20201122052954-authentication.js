"use strict";

var dbm;
var type;
var seed;

import { sqlService } from "../../services";

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  console.log("up");
  await sqlService.executeSqlByPath("create-user", db);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};