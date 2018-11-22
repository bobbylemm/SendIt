import Db from '../dbManager/DbManager';
import ParcelManager from './ParcelManger';

const database = new Db ();
const parcelmanger = new ParcelManager (database);

class ParcelController {
  // this is to create a new parcel
  static async createNewParcel(req, res) {
    const userId = req.user.user.user_id;
    const initialStatus = 'processing';
    const cancelStatus = false;
    const { packageName, pickupLocation, dropOfflocation, presentLocation, weight, price } = req.body;
    try {
        const response = await parcelmanger.addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, cancelStatus, userId);
        if (response.name !== 'error') {
            return res.status(200).json({
                message: 'new parcel created',
                resp: response.rows
            })
        }return res.status(400).json({
            message: 'could not add a new parcel'
        })
    }catch(e) {
        return res.status(400).json({
            message: "parcel could not be added",
        });
   }
}

  // this is to get all parcels by the user
  static async getParcelsByUser(req, res) {
    const { userId } = req.user.user.user_id;
    try {
        const response = await parcelmanger.getAllUsersParcelOrder(userId);
        res.status(200).json({
            message: 'got all this users parcels',
            parcels: response.rows
        })
        // console.log('all this users parcels',response.fields)
    }catch(e) {
        return e;
    }
}

// this is the controller to get all parcels in the application and it should be accessible by the admin only
static async getAllParcels (req, res) {
    // console.log('the request object', req.user);
    try {
        const response = await parcelmanger.getAllParcels();
        return res.status(200).json({
        message: "there was success admin, all parcels have been fetched",
        allParcels: response.rows[0]
    })
    }catch (error) {
        return res.status(401).json({
            message: "error in retrieving parcels, you are not authorized",
            error
        })
    }
}

// this should enable an admin to get all parcels for a particular user
static async getAllParcelsBySpecificUser(req, res) {
    const { uid } = req.params;
    try {
        const response = await parcelmanger.getSpecificUsersParcel(uid);
        res.status(200).json({
            message: 'got all this users parcels',
            parcels: response.rows[0]
        })
        // console.log('all this users parcels',response.fields)
    }catch(e) {
        return e;
    }
}

// this is the controller to update the status of a parcel
static async updateParcelStatus (req, res) {
    const { pid } = req.params;
    const { newStatus } = req.body;
    const validStatus = ['in-transit', 'delivered'].includes(newStatus);
    if (!newStatus || !validStatus) {
        return res.status(400).json({
            message: 'please enter a valid status, as this is not valid'
        })
    }
    try {
        await parcelmanger.updateParcelStatus(newStatus, pid);
        // console.log(response);
        return res.status(200).json({
            messsage: 'parcel status was updated successfully'
        })
    }catch(e) {
        return res.status(400).json({
            message: 'could not update the parcel status'
        })
    }
}
  
// this is to update the present location of a parcel delivery order
static async updateParcelPresentLocation (req, res) {
    const { pid } = req.params;
    const { newLocation } = req.body;
    if(!newLocation) {
        return res.status(400).json({
            message: 'please put in a valid new location'
        })
    }
    try {
        const response = await parcelmanger.updateParcelPresentlocation(newLocation, pid);
        // console.log('new location response',response);
        if (response.rowCount >= 1) {
            return res.status(200).json({
                messsage: 'parcel present location was updated successfully'
            })
        }
            return res.status(400).json({
                message: 'this parcel has already been delivered'
            })
    }catch(e) {
        return e;
    }
}
  // end of class
}
export default ParcelController;
