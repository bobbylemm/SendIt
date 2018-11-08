'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelcontroller = require('../controllers/parcelcontroller');

var _parcelcontroller2 = _interopRequireDefault(_parcelcontroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', _parcelcontroller2.default.createNewParcel);
// this is the route to get all parcels
// GET ALL PARCELS
router.get('/parcels', _parcelcontroller2.default.getAllParcels);

exports.default = router;
//# sourceMappingURL=route.js.map