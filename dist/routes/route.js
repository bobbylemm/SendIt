'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelcontroller = require('../controllers/parcelcontroller');

var _parcelcontroller2 = _interopRequireDefault(_parcelcontroller);

var _usersController = require('../controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _index = require('../middlewares/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// this is for the home route
router.get('/', function (req, res) {
  res.status(200).send('welcome to SendIt');
});

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', _index2.default.validateParcels, _parcelcontroller2.default.createNewParcel);
// this is the route to get all parcels
// GET ALL PARCELS
router.get('/parcels', _parcelcontroller2.default.getAllParcels);
// this is the route to get a specific parcel
// GET A SPECIFIC PARCEL
router.get('/parcels/:id', _parcelcontroller2.default.getSpecificParcel);
// this is to register a new user
// POST A NEW USER
router.post('/register', _usersController2.default.registerUser);
// this is to change the status of a parcel order
// PUT IN A NEW STATUS
router.put('/parcels/status/:id', _parcelcontroller2.default.updateParcelStatus);
// this is to change the status of a parcel order
// PUT IN A NEW STATUS
router.put('/parcels/:id/cancel', _parcelcontroller2.default.cancelParcelOrder);
// this is to delete a specific parcel order
// DELETE A PARCEL ORDER
router.delete('/parcels/:id/delete', _parcelcontroller2.default.deleteSpecificParcel);

// this is to get all users
// GET ALL USERS
router.get('/users', _usersController2.default.getAllUsers);
// this is to register a new user
// POST A NEW USER
router.post('/register', _index2.default.validateRegister, _usersController2.default.registerUser);
// this is to login in an existing user//
router.post('/login', _index2.default.validateLogin, _usersController2.default.login);
// fetch all parcels for a given user
// GET ALL PARCELS FOR A GIVEN USER
router.get('/users/:id/parcels', _usersController2.default.getAllParcelsByUser);
//
exports.default = router;
//# sourceMappingURL=route.js.map