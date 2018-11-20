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
  
  // end of class
}
export default ParcelController;
