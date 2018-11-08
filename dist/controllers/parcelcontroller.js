'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parceldb = require('../sampleDatabase/parceldb');

var _parceldb2 = _interopRequireDefault(_parceldb);

var _findFromDb = require('../helpers/findFromDb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parcelController = function () {
    function parcelController() {
        _classCallCheck(this, parcelController);
    }

    _createClass(parcelController, null, [{
        key: 'createNewParcel',
        value: function createNewParcel(req, res) {
            var newId = _parceldb2.default[_parceldb2.default.length - 1].id + 1;
            var packageName = req.body.packageName,
                destination = req.body.destination,
                pickupLocation = req.body.pickupLocation,
                price = req.body.price;
            var newParcel = {
                id: newId,
                packageName: packageName,
                destination: destination,
                pickupLocation: pickupLocation,
                price: price,
                status: ""
            };
            if (newParcel) {
                _parceldb2.default.push(newParcel);
                return res.status(200).json({
                    message: "new parcel created"
                });
            } else {
                return res.status(400).json({
                    message: "could not add new parcel"
                });
            }
        }
        // this is to get all parcels

    }, {
        key: 'getAllParcels',
        value: function getAllParcels(req, res) {
            return res.json({
                response: "you have sent me a get request to get all questions",
                parcels: _parceldb2.default
            });
        }
        // this is to get a specific parcel

    }, {
        key: 'getSpecificParcel',
        value: function getSpecificParcel(req, res) {
            var parcelId = req.params.id;
            var findParcel = _findFromDb.helper.findFromDb(_parceldb2.default, 'id', parcelId);
            if (findParcel) {
                return res.status(200).json({
                    message: "the parcel was found",
                    parcel: findParcel
                });
            } else {
                return res.status(400).json({
                    message: "sorry the parcel was not found"
                });
            }
        }
    }]);

    return parcelController;
}();

exports.default = parcelController;
//# sourceMappingURL=parcelcontroller.js.map