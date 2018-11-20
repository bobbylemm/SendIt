import Db from '../dbManager/dbManager';
import ParcelManager from './parcelManger';

const database = new Db ();
const parcelmanger = new ParcelManager (database);

class ParcelController {
  // this is to create a new parcel
  static async createNewParcel(req, res) {
    const userId = req.user.user.user_id;
    const initialStatus = 'processing'
    const { packageName, pickupLocation, dropOfflocation, presentLocation, weight, price } = req.body;
    try {
        const response = await parcelmanger.addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId);
        return res.status(200).json({
            message: 'new parcel created',
            resp: response
        })
    }catch(e) {
        return res.status(400).json({
            message: "parcel could not be added",
        });
   }
}

  // this is to get all parcels by the user
  static async getParcelsByUser(req, res) {
    const { userId } = req.body;
    try {
        const response = await parcelmanger.getAllUsersParcelOrder(userId);
        res.status(200).json({
            message: 'got all this users parcels',
            parcels: response.fields
        })
        console.log('all this users parcels',response.fields)
    }catch(e) {
        console.log(e)
    }
}

// this is the controller to get all parcels in the application and it should be accessible by the admin only
static async getAllParcels (req, res) {
    console.log('the request object', req.user);
    try {
        const response = await parcelmanger.getAllParcels();
        return res.status(200).json({
        message: "there was success, all parcels have been fetched",
        allParcels: response.rows[0]
    })
    }catch (e) {
        return res.status(400).json({
            message: "error in retrieving",
            e
        })
    }
}
  
  // end of class
}
export default ParcelController;
