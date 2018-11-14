"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var findFromDb = function findFromDb(db, par, id) {
  return db.find(function (user) {
    return user[par] == id;
  });
};
exports.default = {
  findFromDb: findFromDb
};
//# sourceMappingURL=findFromDb.js.map