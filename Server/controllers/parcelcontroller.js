import allParcels from '../sampleDatabase/parceldb';
import helper from '../helpers/findFromDb';

class parcelController {
  // this is to create a new parcel
  static createNewParcel(req, res) {
    const newId = allParcels[allParcels.length - 1].id + 1;
    const { packageName, destination, pickupLocation, price } = req.body;
    const newParcel = {
      id: newId,
      packageName,
      destination,
      pickupLocation,
      price,
      status: '',
      cancelled: false
    };
    if (newParcel) {
      allParcels.push(newParcel);
      return res.status(200).json({
        message: 'new parcel created'
      });
    }
    return res.status(400).json({
      message: 'could not add new parcel'
    });
  }
  // this is to get all parcels

  static getAllParcels(req, res) {
    return res.json({
      parcels: allParcels
    });
  }
  // this is to get a specific parcel

  static getSpecificParcel(req, res) {
    const parcelId = req.params.id;
    const findParcel = helper.findFromDb(allParcels, 'id', parcelId);
    if (findParcel) {
      return res.status(200).json({
        message: 'the parcel was found',
        parcel: findParcel
      });
    }
    return res.status(400).json({
      message: 'sorry the parcel was not found'
    });
  }
  // this is to update a parcel order status

  static updateParcelStatus(req, res) {
    const parcelId = req.params.id;
    const findParcel = helper.findFromDb(allParcels, 'id', parcelId);
    if (findParcel) {
      const { newStatus } = req.body;
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

  static cancelParcelOrder(req, res) {
    const parcelId = req.params.id;
    const findParcel = helper.findFromDb(allParcels, 'id', parcelId);
    if (findParcel) {
      const toCancel = req.body.cancelled;
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

  static deleteSpecificParcel(req, res) {
    const parcelId = req.params.id;
    const findParcel = helper.findFromDb(allParcels, 'id', parcelId);
    const index = allParcels.indexOf(findParcel);
    if (findParcel) {
      allParcels.splice(index, 1);
      return res.status(200).json({
        message: 'parcel successfully deleted',
        allParcels
      });
    }
    return res.status(400).json({
      message: 'could not delete the parcel'
    });
  }
  // end of class
}
export default parcelController;
