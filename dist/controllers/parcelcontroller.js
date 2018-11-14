'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parceldb = require('../sampleDatabase/parceldb');

var _parceldb2 = _interopRequireDefault(_parceldb);

var _findFromDb = require('../helpers/findFromDb');

var _findFromDb2 = _interopRequireDefault(_findFromDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parcelController = function () {
  function parcelController() {
    _classCallCheck(this, parcelController);
  }

  _createClass(parcelController, null, [{
    key: 'createNewParcel',

    // this is to create a new parcel
    value: function createNewParcel(req, res) {
      var newId = _parceldb2.default[_parceldb2.default.length - 1].id + 1;
      var _req$body = req.body,
          packageName = _req$body.packageName,
          destination = _req$body.destination,
          pickupLocation = _req$body.pickupLocation,
          price = _req$body.price;

      var newParcel = {
        id: newId,
        packageName: packageName,
        destination: destination,
        pickupLocation: pickupLocation,
        price: price,
        status: '',
        cancelled: false
      };
      if (newParcel) {
        _parceldb2.default.push(newParcel);
        return res.status(200).json({
          message: 'new parcel created'
        });
      }
      return res.status(400).json({
        message: 'could not add new parcel'
      });
    }
    // this is to get all parcels

  }, {
    key: 'getAllParcels',
    value: function getAllParcels(req, res) {
      return res.json({
        response: 'you have sent me a get request to get all questions',
        parcels: _parceldb2.default
      });
    }
    // this is to get a specific parcel

  }, {
    key: 'getSpecificParcel',
    value: function getSpecificParcel(req, res) {
      var parcelId = req.params.id;
      var findParcel = _findFromDb2.default.findFromDb(_parceldb2.default, 'id', parcelId);
      if (findParcel) {
        return res.status(200).json({
          parcel: findParcel
        });
      }
      return res.status(400).json({
        message: 'sorry the parcel was not found'
      });
    }
    // this is to update a parcel order status

  }, {
    key: 'updateParcelStatus',
    value: function updateParcelStatus(req, res) {
      var parcelId = req.params.id;
      var findParcel = _findFromDb2.default.findFromDb(_parceldb2.default, 'id', parcelId);
      if (findParcel) {
        var newStatus = req.body.newStatus;

        findParcel.status = newStatus;
        return res.status(200).json({
          message: 'parcel updated successfully'
        });
      }
      return res.status(400).json({
        message: 'could not update parcel order'
      });
    }
    // this is to cancel a specific order

  }, {
    key: 'cancelParcelOrder',
    value: function cancelParcelOrder(req, res) {
      var parcelId = req.params.id;
      var findParcel = _findFromDb2.default.findFromDb(_parceldb2.default, 'id', parcelId);
      if (findParcel) {
        var toCancel = req.body.cancelled;
        findParcel.cancelled = toCancel;
        return res.status(200).json({
          message: 'this parcel order has been cancelled successfully'
        });
      }
      return res.status(400).json({
        message: 'could not update parcel order'
      });
    }
    // this is to delete a specific parcel order

  }, {
    key: 'deleteSpecificParcel',
    value: function deleteSpecificParcel(req, res) {
      var parcelId = req.params.id;
      var findParcel = _findFromDb2.default.findFromDb(_parceldb2.default, 'id', parcelId);
      if (findParcel) {
        var allCurrentParcels = _parceldb2.default.filter(function (parcel) {
          return parcel !== findParcel;
        });
        return res.status(200).json({
          message: 'parcel successfully deleted',
          allparcel: allCurrentParcels
        });
      }
      return res.status(400).json({
        message: 'could not delete the parcel'
      });
    }
    // end of class

  }]);

  return parcelController;
}();

exports.default = parcelController;
//# sourceMappingURL=parcelcontroller.js.map