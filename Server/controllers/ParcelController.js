import Db from '../dbManager/DbManager';
import ParcelManager from './ParcelManger';
import sendEmail from '../mailer/emailNotification';

const database = new Db ();
const parcelmanger = new ParcelManager (database);

class ParcelController {
  // this is to create a new parcel
  static async createNewParcel(req, res) {
    const userId = req.user.user.user_id;
    const initialStatus = 'processing';
    const cancelStatus = false;
    const { packageName, pickupLocation, dropOfflocation, quantity, weight, price, userName } = req.body;
    const presentLocation = pickupLocation;
    try {
        const response = await parcelmanger.addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, quantity, weight, price, initialStatus, cancelStatus, userId, userName);
        if (response.name !== 'error') {
            return res.status(201).json({
                status: 'success',
                message: 'new parcel created',
                newParcel: response.rows[0]
            })
        }return res.status(400).json({
            status: 'failed',
            message: 'could not add a new parcel, please recheck details'
        })
    }catch(e) {
        return res.status(400).json({
            message: "parcel could not be added",
        });
   }
}

// this is the controller to get all parcels in the application and it should be accessible by the admin only
static async getAllParcels (req, res) {
    try {
        const response = await parcelmanger.getAllParcels();
        return res.status(200).json({
        status: 'success',
        message: "there was success admin, all parcels have been fetched",
        allParcels: [response.rows]
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
    const { userName } = req.body;
    try {
        const response = await parcelmanger.getSpecificUsersParcel(userName);
        if(response.rowCount >= 1) {
            return res.status(200).json({
                status: 'success',
                message: 'got all this users parcels',
                parcels: [response.rows]
            })
        }return res.status(404).json({
            status: 'failed',
            message: 'sorry admin there is no such user'
        })
    }catch(e) {
        return e;
    }
}

// this is to get a specific parcel
static async getASpecificParcel(req, res) {
    const { pid } = req.params;
    try {
        const response = await parcelmanger.getSpecificParcel(pid);
        if(response.rows[0] >= 1) {
            return res.status(200).json({
                status: 'success',
                message: 'success, got this specific parcel',
                parcels: response.rows[0]
            })
        }return res.status(400).json({
            error: 'sorry admin there is no such parcel'
        })
    }catch(e) {
        return e;
    }
}

// this is the controller to update the status of a parcel
static async updateParcelStatus (req, res) {
    const { pid } = req.params;
    const { newStatus } = req.body;
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const hr = today.getHours();
    const mn = today.getMinutes();
    const sec = today.getSeconds();
    const updatedAt = `${dd}/${mm}/${yyyy} ${hr}:${mn}:${sec}`;
    const validStatus = ['processing','in-transit', 'delivered'].includes(newStatus);
    if (!newStatus || !validStatus) {
        return res.status(400).json({
            message: 'please enter a valid status, as this is not valid'
        })
    }
    try {
        const response = await parcelmanger.updateParcelStatus(newStatus, pid, updatedAt);
        const message = `hello there, your sendIt parcel delivery status is now ${newStatus}`;
        if (response.rows[0]) {
            const { user_id } = response.rows[0];
            const recipient = await parcelmanger.getUserEmail(user_id);
            const subject = `parcel status update`;
            sendEmail(recipient.rows[0].email, subject ,message)
        }    
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
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const hr = today.getHours();
    const mn = today.getMinutes();
    const sec = today.getSeconds();
    const updatedAt = `${dd}/${mm}/${yyyy} ${hr}:${mn}:${sec}`;
    if(!newLocation) {
        return res.status(400).json({
            message: 'please put in a valid new location'
        })
    }
    try {
        const response = await parcelmanger.updateParcelPresentlocation(newLocation, pid, updatedAt);
        if (response.rowCount >= 1) {
            const message = `hello there, your sendIt parcel delivery location is now ${newLocation}`;
            if (response.rows[0]) {
                const { user_id } = response.rows[0];
                const recipient = await parcelmanger.getUserEmail(user_id);
                const subject = `parcel location update`;
                sendEmail(recipient.rows[0].email, subject ,message)
                return res.status(200).json({
                    status: 'success',
                    messsage: 'parcel present location was updated successfully',
                    response: response.rows[0]
                })
            }
        }
            return res.status(400).json({
                status: 'failed',
                message: 'Present location of a delivered parcel cannot be updated'
            })
    }catch(e) {
        return e;
    }
}
  // end of class
}
export default ParcelController;
